import { ITemplateTokens } from '@wisegar-org/wgo-opengar-core';
import { unlinkSync, writeFileSync, existsSync, readFileSync } from 'fs-extra';
import { join, normalize } from 'path';
import { GetPublicReportPath, REPORT_STORAGE_FOLDER_NAME } from './SettingsService';

export class TemplateService {
  private path: string;
  constructor() {
    this.path = __filename.split('services')[0];
  }

  replaceTokens(body: string, tokens: ITemplateTokens) {
    let result = body;
    Object.keys(tokens).forEach((token: string) => {
      result = result.split(token).join(tokens[token]);
    });
    return result;
  }

  setTableStyle(body: string) {
    const splitBody = body.split('<tbody');
    let result = splitBody.splice(0, 1)[0];
    splitBody.forEach((str: string) => {
      const strPatern = str.split('</tbody>');
      const patern = strPatern.splice(0, 1)[0];
      if (patern.indexOf('[PRODUCT_NAME]') !== -1 || patern.indexOf('[ISSUE_TITLE]') !== -1) {
        result += `<tbody class="tokenTable" ${patern.replace('<tr>', '<tr class="tokenTable">')} ${strPatern.join(
          '</tbody>'
        )}`;
      } else {
        result += `<tbody ${str}`;
      }
    });
    return result;
  }

  replaceTokensTable(body: string, tokens: ITemplateTokens[]) {
    const splitBlody = body.split('<tr');
    let result = splitBlody.splice(0, 1)[0];
    splitBlody.forEach((str: string) => {
      const strPatern = str.split('</tr>');
      const patern = strPatern.splice(0, 1)[0];
      if (patern.indexOf('[PRODUCT_NAME]') !== -1 || patern.indexOf('[ISSUE_TITLE]') !== -1) {
        const tableCell = `<tr${patern}</tr>`;
        let cells = '';
        tokens.forEach((token: ITemplateTokens) => {
          cells += this.replaceTokens(tableCell, token);
        });
        result += `${cells}${strPatern.join('</tr>')}`;
      } else {
        result += `<tr${str}`;
      }
    });
    return result;
  }

  createDocument(titleDoc: string, html: string, tokens?: ITemplateTokens, tableTokens?: ITemplateTokens[]) {
    let body = !!tokens ? this.replaceTokens(html, tokens) : html;
    if (tableTokens) {
      body = this.setTableStyle(body);
      body = this.replaceTokensTable(body, tableTokens);
    }

    const filePath = normalize(join(GetPublicReportPath(), titleDoc));
    const fileRelativePath = `${REPORT_STORAGE_FOLDER_NAME}/${titleDoc}`;
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    writeFileSync(filePath, body, { encoding: 'utf-8' });
    return {
      body: body,
      path: fileRelativePath,
    };
  }

  getDocumentBody(html: string, tokens?: ITemplateTokens, tableTokens?: ITemplateTokens[]) {
    let body = !!tokens ? this.replaceTokens(html, tokens) : html;
    if (tableTokens) {
      body = this.setTableStyle(body);
      body = this.replaceTokensTable(body, tableTokens);
    }
    return body;
  }

  getTemplateContent(path: string) {
    const pathFile = normalize(join(this.path, path));
    const result = readFileSync(pathFile, 'utf-8');
    return result;
  }

  setTemplateContent(path: string, content: string) {
    const pathFile = normalize(join(this.path, path));
    if (existsSync(pathFile)) {
      unlinkSync(pathFile);
    }
    writeFileSync(pathFile, content, { encoding: 'utf-8' });
    return true;
  }
}
