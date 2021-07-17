import { Express } from 'express';
import {
  AccountController,
  CollaboratorController,
  IssueController,
  LabelController,
  MilestoneController,
  ProjectController,
  UpdateIssuesController,
} from '../controllers';
import { InitializeConnection, RegisterConnection } from '../database';
import { InitializeMiddlewares } from '../middlewares';
import { RepositoryController } from '../controllers/RepositoryController';
import { AddAccountParams } from '../utils/models';
import { GenerateAccountHTML } from '../services/AccountDetailsToHTML';
import { ReadStream } from 'fs-extra';
import { OrganizationDataController } from '../controllers/OrganizationDataController';
import { TransactionController } from '../controllers/TransactionController';
import { ExpensesController } from '../controllers/ExpensesController';
import { RolEntityEnum, AuthorizeUserRol, Context } from '@wisegar-org/wgo-opengar-core';
import { SendEmail } from '../services/SendEmail';
import { Connection } from 'typeorm';
import { UploadedFile } from 'express-fileupload';
import { FinanceMediaService } from '../services/FinanceMediaService';
import { IncomeController } from '../controllers/IncomeController';
import { CheckCollaboratosId } from '../content';

console.log('Use environment API_TOKEN: ', process.env.API_TOKEN ? true : false);
const token: string = process.env.API_TOKEN || '6516a804ca7a9f31a28f4d7818ace48a1ea092f7';
// declare module 'express-serve-static-core' {
//   interface Request {
//     context?: Context
//   }
// }

export const InitializeRouter = async (app: Express, conn: Connection) => {
  RegisterConnection(conn);
  await InitializeMiddlewares(app);

  app.get('/api/issues', AuthorizeUserRol([RolEntityEnum.superAdmin, RolEntityEnum.customer]), async (req, res) => {
    const issuesController = new IssueController(req.context);
    const result = { issues: await issuesController.getAllIssues() };
    res.send(result);
  });

  app.get('/api/issues/account/:id', AuthorizeUserRol(), async (req, res) => {
    const issuesController = new IssueController(req.context);
    const result = {
      issues: await issuesController.getIssuesFromAccount(parseInt(req.params.id)),
    };
    res.send(result);
  });

  app.get('/api/milestones', AuthorizeUserRol(), async (req, res) => {
    const milestoneController = new MilestoneController();
    const result = { milestones: await milestoneController.getAllMilestones() };
    res.send(result);
  });

  app.get('/api/labels', AuthorizeUserRol(), async (req, res) => {
    const labelController = new LabelController();
    const result = { labels: await labelController.getAllLabels() };
    res.send(result);
  });

  app.get('/api/projects', AuthorizeUserRol(), async (req, res) => {
    const projController = new ProjectController();
    const result = { projects: await projController.getAllProject() };
    res.send(result);
  });

  app.get('/api/repositories', AuthorizeUserRol(), async (req, res) => {
    const repoController = new RepositoryController();
    const result = { repositories: await repoController.getAllRepository() };
    res.send(result);
  });

  app.get('/api/collaborators', AuthorizeUserRol(), async (req, res) => {
    const colController = new CollaboratorController(req.context);
    const result = { collaborators: await colController.getAllCollaborators() };
    res.send(result);
  });

  app.get('/api/accounts', AuthorizeUserRol(), async (req, res) => {
    const accountController = new AccountController(req.context);
    const result = { accounts: await accountController.getAllAccounts() };
    res.send(result);
  });

  app.get('/api/transactions', AuthorizeUserRol(), async (req, res) => {
    const transactionController = new TransactionController(req.context);
    const result = {
      transactions: await transactionController.getAllTransactions(),
    };
    res.send(result);
  });

  app.get('/api/expenses', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseController = new ExpensesController(req.context);
    const result = {
      expenses: await expenseController.getAllExpenses(),
    };
    res.send(result);
  });

  app.get('/api/incomes', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const incomesController = new IncomeController(req.context);
    const result = {
      incomes: await incomesController.getAllIncomes(),
    };
    res.send(result);
  });

  app.get('/api/update', async (req, res) => {
    const updateIssuesController = new UpdateIssuesController();
    await updateIssuesController.Update(token);
    res.send({ message: 'Updated!', update: true });
  });

  app.post('/api/payload', async (req, res) => {
    const updateIssuesController = new UpdateIssuesController();
    const { issue, comment, repository } = req.body;
    console.log(issue);
    console.log(comment);
    console.log(repository);
    await updateIssuesController.SingleUpdate(token, issue, comment, repository);
    res.send({ message: 'Updated!', update: true });
  });

  app.post('/api/addAccounting', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const accountController = new AccountController(req.context);
    const params = req.body as AddAccountParams;

    await accountController.Add(
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

  app.post('/api/addTransaction', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const transactionController = new TransactionController(req.context);
    const { status, date, cost, card_balance, collaboratorId } = req.body;

    const transaction = await transactionController.addTransaction(status, date, cost, card_balance, collaboratorId);

    res.send({ created: !!transaction, transactions: [transaction] });
  });

  app.post('/api/addExpense', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseController = new ExpensesController(req.context);
    const { name, description, cost, date, status, repeat, bildDocs, collaboratorId } = req.body;

    const expense = await expenseController.addExpense(
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
    const expenseController = new ExpensesController(req.context);
    const { id, status } = req.body;

    const expense = await expenseController.changeStatus(id, status);
    res.send({ updated: !!expense, expenses: [expense] });
  });

  app.post('/api/addIncome', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const incomesController = new IncomeController(req.context);
    const { name, description, amount, date, repeat, invoiceDocs, collaboratorId } = req.body;

    const income = await incomesController.addIncome(
      name,
      description,
      amount,
      date,
      collaboratorId,
      repeat,
      invoiceDocs
    );
    res.send({ created: !!income, incomes: [income] });
  });

  app.post('/api/changeIncomeStatus', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const incomeController = new IncomeController(req.context);
    const { id, status } = req.body;

    const income = await incomeController.changeStatus(id, status);
    res.send({ updated: !!income, incomes: [income] });
  });

  app.post('/api/setIdTransaction', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const transactionController = new TransactionController(req.context);
    const { id, idTransaction } = req.body;

    const transaction = await transactionController.setIdTransaction(id, idTransaction);
    res.send({ update: !!transaction, transactions: [transaction] });
  });

  app.post('/api/addClient', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const collaboratorController = new CollaboratorController(req.context);
    const { name, bio, email, card_number, address } = req.body;

    const coll = await collaboratorController.addCollaborator(
      0,
      '',
      '',
      'client/provider',
      '',
      '',
      name,
      '',
      email,
      bio,
      false,
      card_number,
      address
    );
    res.send({ created: !!coll, collaborators: [coll] });
  });

  app.post(
    '/api/collUpdateAccInfo',
    AuthorizeUserRol([RolEntityEnum.superAdmin, RolEntityEnum.customer]),
    async (req, res) => {
      const colController = new CollaboratorController(req.context);
      const { id, name, card_number, pay_by_hours, pay_to_internet, email, address, bio } = req.body;

      const updated = await colController.updateAccountingInfo(
        id,
        name,
        card_number,
        pay_by_hours,
        pay_to_internet,
        email,
        address,
        bio
      );

      res.send({ update: !!updated, collaborators: [updated] });
    }
  );

  app.get(
    '/api/organizationData',
    AuthorizeUserRol([RolEntityEnum.superAdmin, RolEntityEnum.customer]),
    async (req, res) => {
      const organizationDataController = new OrganizationDataController();
      const organizationData = await organizationDataController.getOrganizationData();
      res.send({ organizationData: organizationData });
    }
  );

  app.post('/api/setOrganizationData', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const organizationDataController = new OrganizationDataController();
    const {
      name,
      description,
      address,
      phone,
      email,
      accountingInternetPrice,
      accountingUnit,
      accountingCoin,
      accountingLabel,
    } = req.body;

    const updated = await organizationDataController.setOrganizationData(
      name,
      description,
      address,
      phone,
      email,
      accountingInternetPrice,
      accountingUnit,
      accountingCoin,
      accountingLabel
    );

    res.send({ update: !!updated, organizationData: updated });
  });

  app.get('/api/exportPdf/:id', AuthorizeUserRol(), async (req, res) => {
    const idAccounting = parseInt(req.params.id);
    GenerateAccountHTML(idAccounting, (doc: ReadStream) => {
      res.setHeader('Content-type', 'application/pdf');
      doc.pipe(res);
    });
  });

  app.post('/api/sendEmail', AuthorizeUserRol(), async (req, res) => {
    const { idAccounting, to, subject, body } = req.body;
    GenerateAccountHTML(idAccounting, (doc: ReadStream) => {
      SendEmail(to, subject, body, doc);
    });
  });

  app.post('/api/editAccounting', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const accountController = new AccountController(req.context);
    const { id, taxes, details, payment_comment } = req.body;

    const updated = await accountController.editAccountingData(id, taxes, details, payment_comment);

    res.send({ updated: !!updated });
  });

  app.get('/api/removeAccounting/:id', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const accountController = new AccountController(req.context);
    const result = {
      updated: await accountController.removeAccount(parseInt(req.params.id), token),
    };
    res.send(result);
  });

  app.post('/api/confirmAccount', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const accountController = new AccountController(req.context);
    const { accountingId } = req.body;
    const confirm = await accountController.confirmAccountById(accountingId);
    res.send({ updated: confirm });
  });

  app.post('/api/updateExpense', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const expenseController = new ExpensesController(req.context);
    const { id, name, description, cost, repeat, bildDocs, date, collaboratorId } = req.body;
    const expense = await expenseController.updateExpenseById(
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

  app.post('/api/updateIncome', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const incomesController = new IncomeController(req.context);
    const { id, name, description, amount, repeat, invoiceDocs, date, collaboratorId } = req.body;
    const income = await incomesController.updateIncomeById(
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

  app.post('/api/addMedia', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const mediaService = new FinanceMediaService();
    if (req.files?.File) {
      const uploadedFiles = req.files?.File instanceof Array ? (req.files?.File as UploadedFile[]) : [req.files?.File];
      const result = await mediaService.uploadFiles(uploadedFiles);
      res.send({ created: result.length > 0, items: result });
    } else res.send({ created: false });
  });

  app.get('/api/downloadMedia', AuthorizeUserRol([RolEntityEnum.superAdmin]), async (req, res) => {
    const mediaService = new FinanceMediaService();
    const { id } = req.query;
    const result = await mediaService.getFile(parseInt(id as string));
    res.send(result);
  });

  app.get('/api/getStats', AuthorizeUserRol(), async (req, res) => {
    const issuesService = new IssueController();
    const { idCollaborator } = req.query;
    const stats = await issuesService.getStats(parseInt(idCollaborator as string));
    res.send({ stats });
  });

  await CheckCollaboratosId(conn);
};
