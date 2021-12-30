import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum, TemplateEntity } from '@wisegar-org/wgo-opengar-core';
import { AccountService } from '../services';
import { AddAccountParams } from '../utils/models';

const token: string = process.env.API_TOKEN;

export const AccountingController = (app: Express, conn: Connection) => {
  app.get('/api/accounts', AuthorizeUserRol(), async (req, res) => {
    const accountService = new AccountService(req.context);
    const result = { accounts: await accountService.getAllAccounts() };
    res.send(result);
  });
  app.post('/api/addAccounting', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const params = req.body as AddAccountParams;

    await accountService.Add(
      params.hours,
      params.collaboratorId,
      params.projectsId,
      params.reposId,
      params.issuesId,
      params.pay_by_hours,
      params.pay_to_internet,
      params.internet_cost,
      params.taxes,
      params.details,
      params.payment_comment,
      params.initDate,
      params.endDate
    );

    res.send({ message: 'Created!', created: true });
  });
  app.post('/api/editAccounting', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const { id, taxes, details, payment_comment } = req.body;

    const updated = await accountService.editAccountingData(id, taxes, details, payment_comment);

    res.send({ updated: !!updated });
  });

  app.get('/api/removeAccounting/:id', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const result = {
      updated: await accountService.removeAccount(parseInt(req.params.id), token),
    };
    res.send(result);
  });

  app.post('/api/confirmAccount', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const { accountingId } = req.body;
    const confirm = await accountService.confirmAccountById(accountingId);
    res.send({ updated: confirm });
  });

  app.get('/api/loadAccountingTemplate', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const { entityTemplate } = req.query;
    const result = await accountService.loadTemplate(entityTemplate as string);
    res.send(result);
  });
  app.post('/api/getAccountingDocumentPreview', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const accountingService = new AccountService(req.context);
    const { entityTemplate, idAccounting, templateHTML, templateStyle } = req.body;
    const result = await accountingService.getDocumentBody(
      entityTemplate as string,
      parseInt(idAccounting as string),
      templateHTML as string,
      templateStyle as string
    );
    res.send(result);
  });

  app.post('/api/saveAccountingTemplate', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const { value } = req.body;

    const updated = await accountService.saveTemplate(value as TemplateEntity);

    res.send(updated);
  });
  app.post('/api/saveAccountingStyleTemplate', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const { value, documentToSet } = req.body;

    const updated = await accountService.saveStyleTemplate(value as TemplateEntity, parseInt(documentToSet as string));

    res.send(updated);
  });

  app.post('/api/sendAccountingLink', AuthorizeUserRol([]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const { id, urlApi } = req.body;

    const updated = await accountService.sendAccountingLink(id, urlApi);

    res.send(updated);
  });
  app.post('/api/getAccountingPreview', AuthorizeUserRol([]), async (req, res) => {
    const accountService = new AccountService(req.context);
    const { id, urlApi } = req.body;

    const updated = await accountService.getLinkToAccounting(id, urlApi);

    res.send(updated);
  });
};
