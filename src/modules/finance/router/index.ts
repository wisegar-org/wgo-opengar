import { Express, static as expressStatics } from 'express';
import { Connection } from 'typeorm';
import { RegisterConnection } from '../database';
import { InitializeMiddlewares } from '../middlewares';
import { fixUserAdminTemplate } from '../content';
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
import { GetPublicReportPath, PUBLIC_REPORT_APP_PATH, REPORT_STORAGE_FOLDER_NAME } from '../services/SettingsService';
import { ReportsMiddleware } from '../middlewares/ReportsMiddleware';
import { CreatePathInPublicFolder } from '../../wgo/settings/ConfigService';

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
  CreatePathInPublicFolder(REPORT_STORAGE_FOLDER_NAME);

  await fixUserAdminTemplate(conn, false);
};
