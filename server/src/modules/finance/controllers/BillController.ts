import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum, TemplateEntity } from '@wisegar-org/wgo-opengar-core';
import { BillsService } from '../services/BillsService';
import { parseInt } from 'lodash';

export const BillController = (app: Express, conn: Connection) => {
  app.get('/api/bills', AuthorizeUserRol(), async (req, res) => {
    const transactionService = new BillsService(req.context);
    const result = {
      bills: await transactionService.getAllBills(),
    };
    res.send(result);
  });
  app.post('/api/addBill', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const {
      name,
      description,
      totalPrice,
      clientId,
      products,
      docs,
      sendDate,
      validDays,
      discount,
      observations,
    } = req.body;

    const bill = await billService.addBill(
      name,
      description,
      totalPrice,
      clientId,
      sendDate,
      validDays,
      discount,
      observations,
      products,
      docs
    );
    res.send({ created: !!bill, bills: [bill] });
  });
  app.post('/api/updateBill', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const {
      id,
      name,
      description,
      totalPrice,
      clientId,
      products,
      docs,
      sendDate,
      validDays,
      discount,
      observations,
    } = req.body;
    const bill = await billService.updateBillById(
      id,
      name,
      description,
      totalPrice,
      clientId,
      sendDate,
      validDays,
      discount,
      observations,
      products,
      docs
    );
    res.send({ updated: !!bill });
  });

  app.get('/api/billDetail', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id } = req.query;
    const result = {
      bills: await billService.getBillDetailsById(parseInt(id.toString())),
    };
    res.send(result);
  });

  app.post('/api/payBill', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id } = req.body;
    const result = {
      updated: !!(await billService.payBill(parseInt(id.toString()))),
    };
    res.send(result);
  });

  app.post('/api/cancelBill', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id } = req.body;
    const result = {
      updated: !!(await billService.cancelBill(parseInt(id.toString()))),
    };
    res.send(result);
  });

  app.get('/api/loadBillTemplate', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { entityTemplate, langId } = req.query;
    const result = await billService.loadTemplate(entityTemplate as string, parseInt((langId as string) || '0'));
    res.send(result);
  });
  app.post('/api/getBillDocumentPreview', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { entityTemplate, idBill, templateHTML, templateStyle, langId } = req.body;
    const result = await billService.getDocumentBody(
      parseInt((langId as string) || '0'),
      entityTemplate as string,
      parseInt(idBill as string),
      templateHTML as string,
      templateStyle as string
    );
    res.send(result);
  });

  app.post('/api/saveBillTemplate', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { value, langId } = req.body;

    const updated = await billService.saveTemplate(value as TemplateEntity, parseInt((langId as string) || '0'));

    res.send(updated);
  });
  app.post('/api/saveBillStyleTemplate', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { value, documentToSet } = req.body;

    const updated = await billService.saveStyleTemplate(value as TemplateEntity, parseInt(documentToSet as string));

    res.send(updated);
  });

  app.post('/api/sendBillLink', AuthorizeUserRol([]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id, urlApi } = req.body;

    const updated = await billService.sendBillLink(id, urlApi);

    res.send(updated);
  });
  app.post('/api/getBillPreview', AuthorizeUserRol([]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id, urlApi } = req.body;

    const updated = await billService.getBillPreview(id, urlApi);

    res.send(updated);
  });
};
