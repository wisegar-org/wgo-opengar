import { IContextOptions } from '@wisegar-org/wgo-server';
import {
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from '@wisegar-org/wgo-settings';
import { SUPERADMIN } from '../wgo-base/authentication/models';
import { translations } from '../wgo-base/core/models';
import { UserRolesModel } from '../wgo-base/authentication/models/UserRolesModel';
import { PostgresDataSource } from '../dataSources';
import { IContextBase } from '../wgo-base/core/models/context';

const authModel = new UserRolesModel({
  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  hostBase: GetHostBaseKey(),
  dataSource: PostgresDataSource,
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
  const ctx = { dataSource: PostgresDataSource } as IContextBase;
  if (!tokenPayload) return ctx;
  const user = await authModel.getUser(parseInt(tokenPayload.userId));
  if (user) {
    ctx.user = user;
    ctx.user.isSuperAdmin = user.roles.indexOf(SUPERADMIN) !== -1;
  }
  // TODO: Add context definition here
  return ctx as any;
};
