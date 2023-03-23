import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { IncomeService } from '../services/IncomeService';
export const IncomeController = (app: Express, conn: Connection) => {
  app.get('/api/incomes', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const incomesService = new IncomeService(req.context);
    const result = {
      incomes: await incomesService.getAllIncomes(),
    };
    res.send(result);
  });
  app.get('/api/incomeDetail', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const incomesService = new IncomeService(req.context);
    const { id } = req.query;
    const result = {
      incomes: await incomesService.getIncomeDetailsById(parseInt(id.toString())),
    };
    res.send(result);
  });
  app.post('/api/addIncome', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const incomesService = new IncomeService(req.context);
    const { name, description, amount, date, repeat, invoiceDocs, collaboratorId } = req.body;

    const income = await incomesService.addIncome(name, description, amount, date, collaboratorId, repeat, invoiceDocs);
    res.send({ created: !!income, incomes: [income] });
  });

  app.post('/api/changeIncomeStatus', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const incomeService = new IncomeService(req.context);
    const { id, status } = req.body;

    const income = await incomeService.changeStatus(id, status);
    res.send({ updated: !!income, incomes: [income] });
  });

  app.post('/api/updateIncome', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const incomesService = new IncomeService(req.context);
    const { id, name, description, amount, repeat, invoiceDocs, date, collaboratorId } = req.body;
    const income = await incomesService.updateIncomeById(
      id,
      name,
      description,
      amount,
      date,
      collaboratorId,
      repeat,
      invoiceDocs
    );
    res.send({ updated: !!income });
  });
};
