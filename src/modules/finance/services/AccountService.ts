import { IssueService } from './IssuesService';
import { AccountEntity, AccountingStatus } from '../database/entities/AccountEntity';
import { Connection, Repository } from 'typeorm';
import { GetConnection } from '../database';
import { RepositoryService } from './RepositoryService';
import { CollaboratorService, ProjectService } from '.';
import { TransactionService } from './TransactionService';
import { OrganizationDataService } from './OrganizationDataService';
import { ExpensesService } from './ExpensesService';
import { Context, GetPublicKey } from '@wisegar-org/wgo-opengar-core';
import { TemplateTokens } from '../utils/models';
import OrganizationDataEntity from '../database/entities/OrganizationDataEntity';
import jsonwebtoken from 'jsonwebtoken';
import { TemplateService } from './TemplateService';
import { EmailService } from './EmailService';
import { v4 as uuidv4 } from 'uuid';

const PATH_ACCOUTING = '/content/AccountingTemplate.html';
const PATH_EMAIL_ACCOUNTING = '/content/AccountingEmailTemplate.html';
const PATH_PAGE_TEMPLATE = '/content/TemplatePage.html';
export class AccountService {
  private connection: Connection;
  private accountConnection: Repository<AccountEntity>;
  private collaboratorService: CollaboratorService;
  private projectService: ProjectService;
  private repositoryService: RepositoryService;
  private issueService: IssueService;
  private expenseService: ExpensesService;
  private templateService: TemplateService;
  private emailService: EmailService;

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
    this.templateService = new TemplateService();
    this.emailService = new EmailService();
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

  async loadTemplate(): Promise<string> {
    return this.templateService.getTemplateContent(PATH_ACCOUTING);
  }

  async saveTemplate(value: string) {
    return this.templateService.setTemplateContent(PATH_ACCOUTING, value);
  }

  async sendAccountingLink(id: number, urlApi: string) {
    const accounting = await this.accountConnection.findOne({
      where: {
        id: id,
      },
      relations: ['contributor', 'projects', 'repos'],
    });

    accounting.issues = await this.issueService.getIssuesFromAccount(id);

    const organization = await this.orgDataService.getOrganizationData();
    const pageTemplate = this.templateService.getTemplateContent(PATH_PAGE_TEMPLATE);
    const emailTemplate = this.templateService.getTemplateContent(PATH_EMAIL_ACCOUNTING);
    const template = await this.loadTemplate();
    const tokensTemplate = this.getAccountingTokens(accounting, organization, template);
    const tokensTable = this.getAccountingTableTokens(accounting, organization);
    const nameFile = `${uuidv4()}.html`;
    const path = this.templateService.createDocument(nameFile, pageTemplate, tokensTemplate, tokensTable);
    const secret = GetPublicKey();
    const token = jsonwebtoken.sign(
      { clientId: accounting.contributorId, nameDoc: nameFile, billId: accounting.id },
      secret
    );

    const urlBill = `${urlApi}${path}?token=${token}`;
    const emailTokens = this.getAccountingEmailTokens(accounting.payment_code, urlBill);
    await this.emailService.sendEmail(
      `<${organization.email}> ${organization.name}`,
      accounting.contributor.email,
      // `${accounting.contributor.name} <${accounting.contributor.email}>`,
      `Accounting ${accounting.payment_code}`,
      this.templateService.replaceTokens(emailTemplate, emailTokens)
    );
    console.log(urlBill);
    return urlBill;
  }

  getAccountingEmailTokens(name: string, link: string) {
    const tokens = <TemplateTokens>{};
    tokens['[NAME]'] = name;
    tokens['[ACCOUNTING_LINK]'] = link;
    return tokens;
  }

  getAccountingTokens(accounting: AccountEntity, organization: OrganizationDataEntity, template: string) {
    const collaborator = accounting.contributor;
    let internet = (accounting.total_hours * 60) / 1024;
    internet = Math.round(internet * 100) / 100;
    const date = accounting.date;

    const total_hours = accounting.total_hours;
    const total_issues = total_hours * accounting.pay_by_hours;
    const total_internet = total_hours * accounting.pay_to_internet * accounting.internet_cost;
    let taxes = accounting.taxes;
    const total = total_issues + total_internet;

    const tokens = <TemplateTokens>{};
    tokens['[TITLEPAGE]'] = `${accounting.payment_code}`;
    tokens['[BODYPAGE]'] = template;
    tokens['[COLLABORATOR_NAME]'] = `${collaborator.name}`;
    tokens['[COLLABORATOR_ADDRESS]'] = `${collaborator.address}`;
    tokens['[COLLABORATOR_EMAIL]'] = `${collaborator.email}`;
    tokens['[ACCOUNTING_ID]'] = `${accounting.payment_code}`;
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
    const tokens: TemplateTokens[] = accounting.issues.map((issue, index) => {
      const tokensBill = <TemplateTokens>{};
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
