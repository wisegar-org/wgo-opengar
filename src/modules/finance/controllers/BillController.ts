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
};
