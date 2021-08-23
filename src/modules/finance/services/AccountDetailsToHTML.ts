import { AccountService, IssueService, OrganizationDataService } from './';
import { ACCOUNTING_CONSTANT } from './AccountService';
import { AccountEntity } from '../database/entities/AccountEntity';
import { IssueEntity } from '../database/entities/IssueEntity';
import { OrganizationDataEntity } from '../database/entities/OrganizationDataEntity';
import { ReadStream } from 'fs-extra';
import { exportHTMLToPdf } from '@wisegar-org/wgo-opengar-core';

class GenerateAccountingPDF {
  accountigService: AccountService;
  issuesService: IssueService;
  organizationDataService: OrganizationDataService;
  accounting: AccountEntity | undefined;
  issues: IssueEntity[];
  organizationData: OrganizationDataEntity;
  constructor() {
    this.accountigService = new AccountService();
    this.issuesService = new IssueService();
    this.organizationDataService = new OrganizationDataService();
    this.accounting = undefined;
    this.issues = [];
    this.organizationData = <OrganizationDataEntity>{};
  }

  async generatePDF(idAccounting: number) {
    const templateAcc = await this.accountigService.loadTemplate(ACCOUNTING_CONSTANT);
    const body = await this.accountigService.getDocumentBody(
      ACCOUNTING_CONSTANT,
      idAccounting,
      templateAcc.body,
      templateAcc.styleTemplate.body
    );
    return body;
  }
}

export async function GenerateAccountHTML(id: number, callback: (doc: ReadStream) => void) {
  const generatePDF = new GenerateAccountingPDF();
  const content = await generatePDF.generatePDF(id);

  await exportHTMLToPdf(
    content,
    {
      format: 'a4',
      margin: {
        top: 50,
        bottom: 50,
      },
    },
    callback
  );
}
