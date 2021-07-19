import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { TransactionService } from '../services/TransactionService';

export const TransactionController = (app: Express, conn: Connection) => {
  app.get('/api/transactions', AuthorizeUserRol(), async (req, res) => {
    const transactionService = new TransactionService(req.context);
    const result = {
      transactions: await transactionService.getAllTransactions(),
    };
    res.send(result);
  });
  app.post('/api/addTransaction', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const transactionService = new TransactionService(req.context);
    const { status, date, cost, card_balance, collaboratorId } = req.body;

    const transaction = await transactionService.addTransaction(status, date, cost, card_balance, collaboratorId);

    res.send({ created: !!transaction, transactions: [transaction] });
  });
  app.post('/api/setIdTransaction', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const transactionService = new TransactionService(req.context);
    const { id, idTransaction } = req.body;

    const transaction = await transactionService.setIdTransaction(id, idTransaction);
    res.send({ update: !!transaction, transactions: [transaction] });
  });
};
