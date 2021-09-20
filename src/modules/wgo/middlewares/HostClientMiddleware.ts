import { Express, static as expressStatics } from 'express';
import { existsSync } from 'fs-extra';
import { GetClientFilesPath } from '../settings/ConfigService';

export const HostClientMiddleware = (App: Express) => {
  if (!existsSync(GetClientFilesPath())) {
    console.error('Host Client folder do not exist!');
    return;
  }
  App.use('/', expressStatics(GetClientFilesPath()));
};
