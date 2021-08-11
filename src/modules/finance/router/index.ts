import { Express, static as expressStatics } from 'express';
import { Connection } from 'typeorm';
import { RegisterConnection } from '../database';
import { InitializeMiddlewares } from '../middlewares';
import { CheckCollaboratosId, exportPublicPaths } from '../content';
import {
  AccountingController,
  CollaboratorController,
  ExpenseController,
  GithubController,
  IncomeController,
  MediaController,
  OrganizationController,
  ProductController,
  TransactionController,
} from '../controllers';
import { ExportController } from '../controllers/ExportController';
import { BillController } from '../controllers/BillController';
import { GetPublicReportPath, PUBLIC_REPORT_APP_PATH } from '../services/SettingsService';
import { ReportsMiddleware } from '../middlewares/ReportsMiddleware';

console.log('Use environment API_TOKEN: ', process.env.API_TOKEN ? true : false);

export const InitializeRouter = async (app: Express, conn: Connection) => {
  RegisterConnection(conn);
  await InitializeMiddlewares(app);

  GithubController(app, conn);
  CollaboratorController(app, conn);
  AccountingController(app, conn);
  TransactionController(app, conn);
  ExpenseController(app, conn);
  IncomeController(app, conn);
  OrganizationController(app, conn);
  MediaController(app, conn);
  ExportController(app, conn);
  ProductController(app, conn);
  BillController(app, conn);

  app.use(PUBLIC_REPORT_APP_PATH, ReportsMiddleware(), expressStatics(GetPublicReportPath()));

  exportPublicPaths();
  await CheckCollaboratosId(conn);
};
