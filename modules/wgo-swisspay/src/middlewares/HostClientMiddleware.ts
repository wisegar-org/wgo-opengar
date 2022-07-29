import { Express, static as expressStatics } from 'express';
import { existsSync, mkdirpSync } from 'fs-extra';

export const GetClientWebRootKey = () => {
  if (process.env.CLIENT_WEB_ROOT) return process.env.CLIENT_WEB_ROOT;
  throw 'Impossible to get value from CLIENT_WEB_ROOT environment key';
};

export const GetWebRootKey = () => {
  if (process.env.APP_WEB_ROOT) return process.env.APP_WEB_ROOT;
  throw 'Impossible to get value from APP_WEB_ROOT environment key';
};

export const UseClientSPAHostMiddleware = (App: Express) => {
  if (!existsSync(GetClientWebRootKey())) {
    console.error('Host client folder do not exist!');
    mkdirpSync(GetClientWebRootKey());
  }
  App.use('/', expressStatics(GetClientWebRootKey()));
};
