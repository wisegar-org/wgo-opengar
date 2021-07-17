import { AccountController, IssueController } from '../controllers';
import { OrganizationDataController } from '../controllers/OrganizationDataController';
import { AccountEntity } from '../database/entities/AccountEntity';
import { IssueEntity } from '../database/entities/IssueEntity';
import { OrganizationDataEntity } from '../database/entities/OrganizationDataEntity';
import { ReadStream } from 'fs-extra';
import moment from 'moment';
import { exportHTMLToPdf, CreateOptions } from '@wisegar-org/wgo-opengar-core';

class GenerateAccountingPDF {
  accountigController: AccountController;
  issuesController: IssueController;
  organizationDataController: OrganizationDataController;
  accounting: AccountEntity | undefined;
  issues: IssueEntity[];
  organizationData: OrganizationDataEntity;
  constructor() {
    this.accountigController = new AccountController();
    this.issuesController = new IssueController();
    this.organizationDataController = new OrganizationDataController();
    this.accounting = undefined;
    this.issues = [];
    this.organizationData = <OrganizationDataEntity>{};
  }

  async generatePDF(idAccounting: number) {
    this.accounting = await this.accountigController.getAccountingById(idAccounting);
    this.issues = await this.issuesController.getIssuesFromAccount(idAccounting);
    this.organizationData = await this.organizationDataController.getOrganizationData();
    return this.generateReportHTML();
  }

  private generateReportHTML() {
    return `
    <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resumen de Pago</title>
          <style>
            h3 {
            display: block;
            text-align: center;
            }
            .padding_class {
              padding: 0;
              margin: 0;
            }
            .culumn-data {
              display: inline-flex;
              width: 100%;
            }
            .unset_margin_top {
              margin-top: unset;
              margin-bottom: unset;
            }
          </style>
        </head>

        <body style="font-size: 13px; font-family: Arial, Helvetica, sans-serif;">
          <div class="padding_class">
            ${this.generateReportHeader()}

            <div style="text-align: left; width: 100%">
              <table style="width: 100%">
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <thead>
                  <tr style="text-align: left">
                    <th class="">Pago</th>
                    <th class="">A</th>
                  </tr>
                </thead>
                <tbody class="" style="text-align: left">
                  <tr>
                    <td class="">
                      ${this.generatePaymentInfo()}
                    </td>
                    <td class="">
                      ${this.generateUserInfo()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br/><br/><br/>
            ${this.generateTable()}
          </div>


          <div style="text-align: left; width: 100%">
            <table style="width: 100%; border-bottom: 2px solid black;">
              <colgroup>
                <col width="50%" />
                <col width="10%" />
                <col width="40%" />
              </colgroup>
              <tbody class="" style="text-align: left">
                <tr>
                  <td class="">
                    <div style="width: 100%;">
                      ${this.generateBankInfo()}
                    </div>
                  </td>
                  <td class="">
                    <div style="width: 100%; text-align: left;">
                      ${this.generateHoursInfo()}
                    </div>
                  </td>
                  <td style="text-align: right;">
                    <div class="column" style="width: 100%">
                      ${this.generatePaymet()}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="padding_class" style="position: relative;">
            <p  style="margin-top: unset; margin-bottom: 0.5rem;">Observaciones:</p>
            ${this.accounting?.details}
          </div>
        </body>
      </html>

    `;
  }

  private generateReportHeader() {
    return `
      <h3 class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Resumen de pago</h3>
      <h2 class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">${this.organizationData.name}</h2>
      <h4 class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">${this.organizationData.description}</h4>
      <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">${this.organizationData.address}</p>
      <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Tel. ${this.organizationData.phone}</p>
      <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">E-mail: ${this.organizationData.email}</p>
      <br/><br/><br/>
    `;
  }

  private generatePaymentInfo() {
    const date = moment(this.accounting?.date).format('DD/MM/YYYY');
    return `
      <div style="width: 100%;">
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">No. ${this.accounting?.payment_code}</p>
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Data: ${date}</p>
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Pagamento: ${this.accounting?.payment_comment}</p>
      </div>
    `;
  }

  private generateUserInfo() {
    return `
      <div style="width: 100%; text-a">
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">${this.accounting?.contributor.name}</p>
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Address: ${this.accounting?.contributor.address}</p>
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">E-mail: ${this.accounting?.contributor.email}</p>
      </div>
    `;
  }

  private generateTable() {
    return `
      <div style="text-align: center; width: 100%;">
        <table style="width: 100%; border-top: 2px solid black; border-bottom: 2px solid black; page-break-inside:auto;">
          ${this.generateTableHeader()}
          ${this.generateTableBody()}
        </table>
      </div>
    `;
  }

  private generateTableHeader() {
    return `
      <colgroup>
          <col width="auto">
          <col width="auto">
          <col width="auto">
          <col width="auto">
          <col width="45%">
          <col width="auto">
        </colgroup>
        <thead class="" style="border-bottom: 2px solid black; page-break-inside: auto; display:table-header-group">
          <tr style="border-bottom: 2px solid black; page-break-inside:avoid; page-break-after:auto;">
            <th class="">Fecha</th>
            <th class="">Unidad</th>
            <th class="">Cantidad</th>
            <th class="">Precio</th>
            <th class="">Información</th>
            <th class="">Sub Total</th>
          </tr>
      </thead>
    `;
  }

  private generateTableBody() {
    let body = '';
    let date = moment(this.accounting?.date).format('DD/MM/YYYY');
    const pay_by_hours = this.accounting?.contributor.pay_by_hours || 0;
    this.issues.forEach((issue: IssueEntity) => {
      body += `
        <tr style="page-break-inside:avoid; page-break-after:auto">
          <td class="">${date}</td>
          <td class="">${this.organizationData.accountingUnit}</td>
          <td class="">${issue.hours}</td>
          <td class="">${pay_by_hours} ${this.organizationData.accountingCoin}</td>
          <td class="">${issue.number} - ${issue.title}</td>
          <td class="">${issue.hours * pay_by_hours}</td>
        </tr>
      `;
    });

    return `
      <tbody class="">
        ${body}
      </tbody>
    `;
  }

  private generateBankInfo() {
    return `
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Información del banco</p>
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">IBAN:  ${
          this.accounting?.contributor.card_number
        } </p>
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">A FAVOR DE:  ${(
          this.accounting?.contributor.name || ''
        ).toUpperCase()}</p>
        <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">DIRECCION:  ${
          this.accounting?.contributor.address
        } </p>
    `;
  }

  private generateHoursInfo() {
    let internet = ((this.accounting?.total_hours || 0) * 60) / 1024;
    internet = Math.round(internet * 100) / 100;
    return `
      <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">No. Horas</p>
      <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">${this.accounting?.total_hours} ${this.organizationData.accountingUnit}</p>
      <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Internet</p>
      <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">${internet} gb</p>
    `;
  }

  private generatePaymet() {
    const total_hours = this.accounting?.total_hours || 0;
    const total_issues = total_hours * (this.accounting?.pay_by_hours || 0);
    const total_internet =
      total_hours * (this.accounting?.pay_to_internet || 0) * (this.accounting?.internet_cost || 0);
    let taxes = this.accounting?.taxes || 0;
    const total = total_issues + total_internet;
    return `
            <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Sub Total:  ${total_issues} ${
      this.organizationData.accountingCoin
    }</p>
            <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Internet:   ${total_internet} ${
      this.organizationData.accountingCoin
    }</p>
            <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">Impuestos:  ${taxes} ${
      this.organizationData.accountingCoin
    }</p>
            <p class="unset_margin_top" style="margin-top: unset; margin-bottom: 0.5rem;">A pagar:    ${
              total - taxes
            } ${this.organizationData.accountingCoin}</p>
    `;
  }
}

export async function GenerateAccountHTML(id: number, callback: (doc: ReadStream) => void) {
  const generatePDF = new GenerateAccountingPDF();
  const content = await generatePDF.generatePDF(id);
  const config: CreateOptions = {
    format: 'A4',
    orientation: 'portrait',
    type: 'pdf',
    border: { left: '35', right: '35', top: '45', bottom: '45' },
  };
  await exportHTMLToPdf(content, config, callback);
}
