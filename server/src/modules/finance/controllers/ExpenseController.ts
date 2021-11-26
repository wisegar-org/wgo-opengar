import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { ExpensesService } from '../services/ExpensesService';
export const ExpenseController = (app: Express, conn: Connection) => {
  app.get('/api/expenses', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseService = new ExpensesService(req.context);
    const result = {
      expenses: await expenseService.getAllExpenses(),
    };
    res.send(result);
  });
  app.get('/api/expenseDetail', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseService = new ExpensesService(req.context);
    const { id } = req.query;
    const result = {
      expenses: await expenseService.getExpenseDetailsById(parseInt(id.toString())),
    };
    res.send(result);
  });
  app.post('/api/addExpense', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseService = new ExpensesService(req.context);
    const { name, description, cost, date, status, repeat, bildDocs, collaboratorId } = req.body;

    const expense = await expenseService.addExpense(
      name,
      description,
      cost,
      date,
      collaboratorId,
      status,
      repeat,
      bildDocs
    );
    res.send({ created: !!expense, expenses: [expense] });
  });

  app.post('/api/changeExpenseStatus', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseService = new ExpensesService(req.context);
    const { id, status } = req.body;

    const expense = await expenseService.changeStatus(id, status);
    res.send({ updated: !!expense, expenses: [expense] });
  });

  app.post('/api/updateExpense', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseService = new ExpensesService(req.context);
    const { id, name, description, cost, repeat, bildDocs, date, collaboratorId } = req.body;
    const expense = await expenseService.updateExpenseById(
      id,
      name,
      description,
      cost,
      date,
      collaboratorId,
      repeat,
      bildDocs
    );
    res.send({ updated: !!expense });
  });
};
