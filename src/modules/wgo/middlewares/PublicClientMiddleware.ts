import { Express, static as expressStatics } from 'express';
import {
  CreatePathInPrivateFolder,
  CreatePathInPublicFolder,
  FILES_STORAGE_FOLDER_NAME,
  GetPublicFilesPath,
  PUBLIC_FILES_APP_PATH,
} from '../settings/ConfigService';

export function PublicClientMiddleware(App: Express) {
  App.use(PUBLIC_FILES_APP_PATH, expressStatics(GetPublicFilesPath()));
  CreatePathInPublicFolder(FILES_STORAGE_FOLDER_NAME);
  CreatePathInPrivateFolder(FILES_STORAGE_FOLDER_NAME);
}
