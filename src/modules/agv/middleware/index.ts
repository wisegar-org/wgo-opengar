import { Express, static as expressStatics } from 'express';
import { PUBLIC_FILES_APP_PATH, GetPublicFilesPath } from '../../../settings/ConfigService';

export function InitializeAGVMiddlewares(App: Express) {
  App.use(PUBLIC_FILES_APP_PATH, expressStatics(GetPublicFilesPath()));
}
