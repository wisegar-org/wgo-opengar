import { IContextOptions } from '@wisegar-org/wgo-server';
import {
  GetCypherKey,
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from '@wisegar-org/wgo-settings';
import { PostgresDataSource } from '../dataSources';
import { GetWebRootKey } from '../middlewares/HostClientMiddleware';
import { EventEmitter } from 'events';
import { IContextBase, translations, SUPERADMIN } from '@wisegar-org/wgo-base-models';
import { listenersEvents, UserRolesModel } from '@wisegar-org/wgo-base-server';

export const ctx = <IContextBase>{
  dataSource: PostgresDataSource,
  web_root: GetWebRootKey(),
  emiter: new EventEmitter(),
  listenersEvents: listenersEvents,
  cypherKey: GetCypherKey(),
};

const authModel = new UserRolesModel({
  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  hostBase: `${GetHostBaseKey()}/#`,
  ctx,
  tokenExpiresIn: GetExpiresInKey(),
  tokenRegisterExpiresIn: '24h',
  emailOptions: { from: GetEmailAppAddressKey() } as any,
  transportEmailOptions: {},
});

export const AppContextHandler = async (options: IContextOptions) => {
  if (!options) {
    throw new Error(translations.INVALID_PARAMS);
  }
  const { tokenPayload, requestHeaders } = options;

  const ctxApp = {
    ...ctx,
  };
  if (!tokenPayload) return ctxApp;
  const user = await authModel.getUser(parseInt(tokenPayload.userId));
  if (user) {
    ctxApp.user = {
      ...user,
      isSuperAdmin: user.roles.indexOf(SUPERADMIN) !== -1,
    };
  }
  // TODO: Add context definition here
  return ctxApp as any;
};
