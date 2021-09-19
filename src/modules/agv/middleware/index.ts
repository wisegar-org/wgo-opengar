import { Express, static as expressStatics } from 'express';
import {
  PUBLIC_FILES_APP_PATH,
  GetPublicFilesPath,
  CreatePathInPublicFolder,
  CreatePathInPrivateFolder,
  FILES_STORAGE_FOLDER_NAME,
} from '../../wgo/settings/ConfigService';

export function InitializeAGVMiddlewares(App: Express) {
  App.use(PUBLIC_FILES_APP_PATH, expressStatics(GetPublicFilesPath()));
  CreatePathInPublicFolder(FILES_STORAGE_FOLDER_NAME);
  CreatePathInPrivateFolder(FILES_STORAGE_FOLDER_NAME);
}
