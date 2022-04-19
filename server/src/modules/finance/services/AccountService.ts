import { IssueService } from './IssuesService';
import { AccountEntity, AccountingStatus } from '../database/entities/AccountEntity';
import { Connection, Repository } from 'typeorm';
import { GetConnection } from '../database';
import { RepositoryService } from './RepositoryService';
import { CollaboratorService, ProjectService } from '.';
import { TransactionService } from './TransactionService';
import { OrganizationDataService } from './OrganizationDataService';
import { ExpensesService } from './ExpensesService';
import { Context, EmailNotifyService } from '@wisegar-org/wgo-opengar-core';
import {
  ITemplateTokens,
  ParseTemplateService,
  TemplateEntity,
  HandlebarsTemplateService,
  TemplateService,
} from '@wisegar-org/wgo-templating';
import OrganizationDataEntity from '../database/entities/OrganizationDataEntity';
import { v4 as uuidv4 } from 'uuid';
import { GetPublicReportPath, getTokenToReport, REPORT_STORAGE_FOLDER_NAME } from './SettingsService';

export const ACCOUNTING_CONSTANT = 'ACCOUNTING_TEMPLATE';
export const ACCOUNTING_EMAIL_CONSTANT = 'ACCOUNTING_EMAIL_TEMPLATE';
export class AccountService {
  private connection: Connection;
  private accountConnection: Repository<AccountEntity>;
  private collaboratorService: CollaboratorService;
  private projectService: ProjectService;
  private repositoryService: RepositoryService;
  private issueService: IssueService;
  private expenseService: ExpensesService;
  private templateService: TemplateService;
  private parseTemplateService: ParseTemplateService;
  private emailNotify: EmailNotifyService;

  private handlebarsTemplate: HandlebarsTemplateService;

  private orgDataService: OrganizationDataService;
  path: string;

  constructor(userContext?: Context) {
    // debugger
    this.connection = GetConnection();
    this.accountConnection = this.connection.getRepository(AccountEntity);
    this.collaboratorService = new CollaboratorService(userContext);
    this.projectService = new ProjectService();
    this.repositoryService = new RepositoryService();
    this.issueService = new IssueService(userContext);
    this.expenseService = new ExpensesService(userContext);
    this.orgDataService = new OrganizationDataService();
    this.templateService = new TemplateService(this.connection);
    this.parseTemplateService = new ParseTemplateService();
    this.emailNotify = new EmailNotifyService();
    this.handlebarsTemplate = new HandlebarsTemplateService();
  }

  async Add(
    total_hours: number,
    contributorId: number,
    projectsIds: number[],
    reposIds: number[],
    issuesIds: number[],
    pay_by_hours: number,
    pay_to_internet: number,
    internet_cost: number,
    taxes: number,
    details: string,
    payment_comment: string,
    initDate: string,
    endDate: string
  ): Promise<AccountEntity> {
    if (!process.env.API_TOKEN) {
      throw Error('Github module error: API_TOKEN is empty.');
    }

    const token: string = process.env.API_TOKEN;

    const AccountLabel = (await this.orgDataService.getOrganizationData()).accountingLabel;

    const collaborator = contributorId ? await this.collaboratorService.findCollaboratorById(contributorId) : undefined;
    const projects = projectsIds ? await this.projectService.findProjectsById(projectsIds) : undefined;
    const repos = reposIds ? await this.repositoryService.findRepositoriesById(reposIds) : undefined;
    const issues = issuesIds ? await this.issueService.findIssuesById(issuesIds) : undefined;

    const total_issues = issuesIds ? issuesIds.length : 0;

    const total_projects = projectsIds ? projectsIds.length : 0;

    const total_repos = reposIds ? reposIds.length : 0;

    const account = new AccountEntity(
      total_hours,
      total_issues,
      total_projects,
      total_repos,
      pay_by_hours,
      pay_to_internet,
      internet_cost,
      taxes,
      details,
      payment_comment,
      collaborator,
      projects,
      repos,
      new Date(initDate),
      new Date(endDate)
    );
    const accountResult = await this.accountConnection.manager.save(account);

    if (issues) {
      for (const issue of issues) {
        const iss = await this.issueService.updateAccount(issue.id, accountResult.id, accountResult);
        if (iss) {
          try {
            await this.issueService.setLabel(
              iss.owner,
              iss.repo,
              issue.number,
              AccountLabel || 'FAKE ACCOUNT FROM WGO-GITHUB PAGE',
              token
            );
          } catch (error) {
            console.log('============================================================');
            console.log('ACCOUNTING ERROR: ', error);
            console.log('============================================================');
          }
        }
      }
    }

    return await this.accountConnection.manager.save(accountResult);
  }

  async editAccountingData(id: number, taxes: number, details: string, payment_comment: string): Promise<boolean> {
    const accounting = await this.accountConnection.findOne({
      id: id,
    });

    if (accounting) {
      accounting.taxes = taxes || 0;
      accounting.details = details ? details : accounting.details;
      accounting.payment_comment = payment_comment ? payment_comment : accounting.payment_comment;
      accounting.value = accounting.getTotalToPay();
      await accounting.save();

      return true;
    } else return false;
  }

  async removeAccount(id: number, token: string): Promise<boolean> {
    const accounting = await this.accountConnection.findOne({
      id: id,
    });

    if (accounting) {
      // Restaurar todas las issues involugradas en el account eliminandole el label en github
      // Eliminar la relacion de cada issue con el accounting
      // Cambiar el accounting del estado Pending al estado al Restored
      const orgDataService = new OrganizationDataService();
      const accountLabel = (await orgDataService.getOrganizationData()).accountingLabel || 'FakeAccount';
      await this.issueService.removeAccount(id, accountLabel, token);
      accounting.status = AccountingStatus.Cancelled;
      await accounting.save();

      return true;
    }
    return false;
  }

  async getAllAccounts(): Promise<AccountEntity[]> {
    const filter = await this.collaboratorService.getFilterByCollaborator('contributorId');
    return await this.accountConnection.find({
      where: { ...filter },
      relations: ['contributor', 'projects', 'repos'],
      order: { id: 'DESC' },
    });
  }

  async getAccountingById(id: number): Promise<AccountEntity | undefined> {
    const filter = await this.collaboratorService.getFilterByCollaborator('contributorId');
    return await this.accountConnection.findOne({
      where: {
        ...filter,
        id: id,
      },
      relations: ['contributor', 'projects', 'repos'],
    });
  }

  async confirmAccountById(id: number): Promise<boolean> {
    const accounting = await this.accountConnection.findOne({
      where: { id: id },
    });
    if (!!accounting) {
      if (accounting.status === AccountingStatus.Pending) {
        const expense = await this.expenseService.createExpenseByAccounting(accounting);
        if (!!expense) {
          accounting.status = AccountingStatus.Confirmed;
          await accounting.save();
          return true;
        }
      }
    }
    return false;
  }

  async loadTemplate(entityTemplate: string): Promise<TemplateEntity> {
    let accountingTemplate = await this.templateService.getTemplateByEntityTemplate(entityTemplate);
    if (!accountingTemplate) {
      accountingTemplate = await this.templateService.saveDocumentTamplate(0, entityTemplate, '', entityTemplate, null);
    }
    if (!accountingTemplate.styleTemplateId) {
      accountingTemplate.styleTemplate = await this.templateService.saveStyleTemplate(
        0,
        `STYLE_${entityTemplate}`,
        '',
        accountingTemplate.id
      );
      accountingTemplate.styleTemplateId = accountingTemplate.styleTemplate.id;
    }
    return accountingTemplate;
  }

  async saveTemplate(value: TemplateEntity) {
    return await this.templateService.saveDocumentTamplate(
      value.id,
      value.title,
      value.body,
      value.entityTemplate,
      value.styleTemplate.id
    );
  }

  async saveStyleTemplate(value: TemplateEntity, documentToSet: number) {
    return await this.templateService.saveStyleTemplate(value.id, value.title, value.body, documentToSet);
  }

  async getLinkToAccounting(id: number, urlApi: string) {
    try {
      const templateDoc = await this.loadTemplate(ACCOUNTING_CONSTANT);
      const accounting = await this.accountConnection.findOne({
        where: { id: id },
        relations: ['contributor', 'projects', 'repos'],
      });
      accounting.issues = await this.issueService.getIssuesFromAccount(id);
      const nameFile = `${uuidv4()}.html`;
      const path_token = getTokenToReport({
        clientId: accounting.contributor.id,
        nameDoc: nameFile,
        billId: accounting.id,
      });
      const urlAccounting = `${urlApi}${REPORT_STORAGE_FOLDER_NAME}/${nameFile}?token=${path_token}`;
      const organization = await this.orgDataService.getOrganizationData();

      const exportPath = GetPublicReportPath();

      const data = {
        style: templateDoc.styleTemplate.body,
        titlePage: 'Bill',
        accounting: accounting,
        issues: accounting.issues,
        status: `${accounting.status === AccountingStatus.Confirmed ? 'Confirmed' : 'Pending'}`,
        organization: organization,
        collaborator: accounting.contributor,
        pay_internet: accounting.total_hours * accounting.pay_to_internet * accounting.internet_cost,
        pay_issues: accounting.total_hours * accounting.pay_by_hours,
        accountingLink: urlAccounting,
      };

      let doc = this.handlebarsTemplate.getTemplateData(templateDoc.body, data);
      await this.parseTemplateService.createDocument(exportPath, nameFile, doc);
      return {
        isSuccess: true,
        url: urlAccounting,
      };
    } catch (err) {
      return {
        isSuccess: false,
        error: err,
      };
    }
  }

  async sendAccountingLink(id: number, urlApi: string) {
    try {
      const templateDoc = await this.loadTemplate(ACCOUNTING_CONSTANT);
      const templateEmail = await this.loadTemplate(ACCOUNTING_EMAIL_CONSTANT);
      const accounting = await this.accountConnection.findOne({
        where: { id: id },
        relations: ['contributor', 'projects', 'repos'],
      });
      accounting.issues = await this.issueService.getIssuesFromAccount(id);
      const nameFile = `${uuidv4()}.html`;
      const path_token = getTokenToReport({
        clientId: accounting.contributor.id,
        nameDoc: nameFile,
        billId: accounting.id,
      });
      const urlAccounting = `${urlApi}${REPORT_STORAGE_FOLDER_NAME}/${nameFile}?token=${path_token}`;
      const organization = await this.orgDataService.getOrganizationData();

      const exportPath = GetPublicReportPath();

      const data = {
        style: templateDoc.styleTemplate.body,
        titlePage: 'Bill',
        accounting: accounting,
        issues: accounting.issues,
        status: `${accounting.status === AccountingStatus.Confirmed ? 'Confirmed' : 'Pending'}`,
        organization: organization,
        collaborator: accounting.contributor,
        pay_internet: accounting.total_hours * accounting.pay_to_internet * accounting.internet_cost,
        pay_issues: accounting.total_hours * accounting.pay_by_hours,
        accountingLink: urlAccounting,
      };

      let doc = this.handlebarsTemplate.getTemplateData(templateDoc.body, data);
      await this.parseTemplateService.createDocument(exportPath, nameFile, doc);

      const result = await this.emailNotify.sendNotification({
        emailOptions: {
          to: accounting.contributor.email,
          subject: `Accounting ${accounting.payment_code}`,
        },
        bodyTemplate: {
          template: templateEmail.body,
          data: { ...data, style: templateEmail.styleTemplate.body },
        },
      });
      result.message = urlAccounting;
      return result;
    } catch (error) {
      console.log(error);
      return {
        isSuccess: false,
        message: 'Error',
        error: error,
      };
    }
  }

  async getDocumentBody(entityTemplate: string, idAccounting: number, templateHTML?: string, templateStyle?: string) {
    const templateDoc = await this.loadTemplate(entityTemplate);
    const accounting = await this.accountConnection.findOne({
      where: { id: idAccounting },
      relations: ['contributor', 'projects', 'repos'],
    });
    if (accounting) {
      accounting.issues = await this.issueService.getIssuesFromAccount(idAccounting);
      const organization = await this.orgDataService.getOrganizationData();

      return this.handlebarsTemplate.getTemplateData(templateHTML || templateDoc.body, {
        style: templateStyle || templateDoc.styleTemplate.body,
        titlePage: 'Bill',
        accounting: accounting,
        issues: accounting.issues,
        status: `${accounting.status === AccountingStatus.Confirmed ? 'Confirmed' : 'Pending'}`,
        organization: organization,
        collaborator: accounting.contributor,
        pay_internet: accounting.total_hours * accounting.pay_to_internet * accounting.internet_cost,
        pay_issues: accounting.total_hours * accounting.pay_by_hours,
      });
    } else {
      return this.handlebarsTemplate.getTemplateData(templateHTML || templateDoc.body, {
        style: templateStyle || templateDoc.styleTemplate.body,
      });
    }
  }

  replaceTableTokens(templateHTML: string, tokens: ITemplateTokens[], templateService: ParseTemplateService) {
    let result = '';
    tokens.forEach((token) => {
      result += templateService.replaceTokens(templateHTML, token);
    });
    return result;
  }

  getAccountingTokens(accounting: AccountEntity, organization: OrganizationDataEntity) {
    const collaborator = accounting.contributor;
    let internet = (accounting.total_hours * 60) / 1024;
    internet = Math.round(internet * 100) / 100;
    const date = accounting.date;

    const total_hours = accounting.total_hours;
    const total_issues = total_hours * accounting.pay_by_hours;
    const total_internet = total_hours * accounting.pay_to_internet * accounting.internet_cost;
    let taxes = accounting.taxes;
    const total = total_issues + total_internet;

    const tokens = <ITemplateTokens>{};

    tokens['[TITLEPAGE]'] = `${accounting.payment_code}`;
    tokens['[COLLABORATOR_NAME]'] = `${collaborator.name}`;
    tokens['[COLLABORATOR_ADDRESS]'] = `${collaborator.address}`;
    tokens['[COLLABORATOR_EMAIL]'] = `${collaborator.email}`;
    tokens['[ACCOUNTING_ID]'] = `${accounting.payment_code}`;
    tokens['[ACCOUNTING_STATUS]'] = `${accounting.status === AccountingStatus.Confirmed ? 'Confirmed' : 'Pending'}`;
    tokens['[ACCOUNTING_DATE]'] = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    tokens['[ACCOUNTING_HOURS]'] = `${accounting.total_hours}`;
    tokens['[ACCOUNTING_INTERNET]'] = `${internet}Gb`;
    tokens['[ACCOUNTING_SUBTOTAL]'] = `${total_issues}${organization.accountingCoin}`;
    tokens['[ACCOUNTING_TAXES]'] = `${taxes}${organization.accountingCoin}`;
    tokens['[ACCOUNTING_TOTAL]'] = `${total - taxes}${organization.accountingCoin}`;
    tokens['[ACCOUNTING_OBSERVATION]'] = `${accounting.details}`;
    tokens['[ACCOUNTING_DETAIL]'] = `${accounting.payment_comment}`;
    tokens['[ORGANIZATION_NAME]'] = `${organization.name}`;
    tokens['[ORGANIZATION_DESCRIPTION]'] = `${organization.description}`;
    tokens['[ORGANIZATION_ADDRESS]'] = `${organization.address}`;
    tokens['[ORGANIZATION_PHONE]'] = `${organization.phone}`;
    tokens['[ORGANIZATION_EMAIL]'] = `${organization.email}`;
    tokens['[ORGANIZATION_INTERNET_PRICE]'] = `${total_internet}${organization.accountingCoin}`;

    return tokens;
  }

  getAccountingTableTokens(accounting: AccountEntity, organization: OrganizationDataEntity) {
    const collaborator = accounting.contributor;
    const tokens: ITemplateTokens[] = accounting.issues.map((issue, index) => {
      const tokensBill = <ITemplateTokens>{};
      tokensBill['[INDEX]'] = `${index + 1}`;
      tokensBill['[ORGANIZATION_UNIT]'] = `${organization.accountingUnit}`;
      tokensBill['[ISSUE_HOURS]'] = `${issue.hours}`;
      tokensBill['[ISSUE_PRICE]'] = `${accounting.pay_by_hours}${organization.accountingCoin}`;
      tokensBill['[ISSUE_TITLE]'] = `${issue.number} - ${issue.title}`;
      tokensBill['[ISSUE_PRICE_TOTAL]'] = `${issue.hours * accounting.pay_by_hours}${organization.accountingCoin}`;
      return tokensBill;
    });
    return tokens;
  }
}
