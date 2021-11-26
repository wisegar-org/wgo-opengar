import { AccountService, IssueService, OrganizationDataService } from './';
import { ACCOUNTING_CONSTANT } from './AccountService';
import { AccountEntity } from '../database/entities/AccountEntity';
import { IssueEntity } from '../database/entities/IssueEntity';
import { OrganizationDataEntity } from '../database/entities/OrganizationDataEntity';
import { ReadStream } from 'fs-extra';
import { exportHTMLToPdfReadStream } from '@wisegar-org/wgo-opengar-core';
import { Readable } from 'stream';

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
    // await this.accountigService.parseTemplateService.createDocument('./', 'temp2.html', body);
    return body;
  }
}

export async function GenerateAccountHTML(id: number, callback: (doc: ReadStream) => void) {
  const generatePDF = new GenerateAccountingPDF();
  const content = { content: await generatePDF.generatePDF(id) };

  const html_to_pdf = require('html-pdf-node');
  html_to_pdf
    .generatePdf(content, {
      args: ['--enable-viewport', '--extension-content-verification'],
      format: 'A4',
      preferCSSPageSize: true,
      // margin: {
      //   top: 120,
      //   bottom: 120,
      //   right: 120,
      //   left: 120,
      // },
    })
    .then((pdfBuffer) => {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(pdfBuffer);
      readable.push(null);
      callback(readable as any);
    })
    .catch((error) => {
      console.log(error);
    });
  // await exportHTMLToPdf(
  //   content,
  //   {
  //     format: 'a4',
  //     margin: {
  //       top: 50,
  //       bottom: 50,
  //     },
  //   },
  //   callback
  // );
}
