import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { BillsService } from '../services/BillsService';

export const BillController = (app: Express, conn: Connection) => {
  app.get('/api/bills', AuthorizeUserRol(), async (req, res) => {
    const transactionService = new BillsService(req.context);
    const result = {
      bills: await transactionService.getAllBills(),
    };
    res.send(result);
  });
  app.post('/api/addBill', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { name, description, totalPrice, clientId, products, docs } = req.body;

    const bill = await billService.addBill(name, description, totalPrice, clientId, products, docs);
    res.send({ created: !!bill, bills: [bill] });
  });
  app.post('/api/updateBill', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id, name, description, totalPrice, clientId, products, docs } = req.body;
    const bill = await billService.updateBillById(id, name, description, totalPrice, clientId, products, docs);
    res.send({ updated: !!bill });
  });

  app.get('/api/billDetail', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id } = req.query;
    const result = {
      bills: await billService.getBillDetailsById(parseInt(id.toString())),
    };
    res.send(result);
  });

  app.post('/api/payBill', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id } = req.body;
    const result = {
      updated: !!(await billService.payBill(parseInt(id.toString()))),
    };
    res.send(result);
  });

  app.post('/api/cancelBill', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id } = req.body;
    const result = {
      updated: !!(await billService.cancelBill(parseInt(id.toString()))),
    };
    res.send(result);
  });

  app.get('/api/loadBillTemplate', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const result = await billService.loadTemplate();
    res.send(result);
  });

  app.post('/api/saveBillTemplate', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { value } = req.body;

    const updated = await billService.saveTemplate(value);

    res.send(updated);
  });

  app.post('/api/sendBillLink', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const billService = new BillsService(req.context);
    const { id, urlApi } = req.body;

    const updated = await billService.sendBillLink(id, urlApi);

    res.send(updated);
  });
};