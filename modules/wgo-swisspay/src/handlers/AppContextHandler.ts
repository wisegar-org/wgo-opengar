import { IContextOptions } from '@wisegar-org/wgo-server';
import {
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from '@wisegar-org/wgo-settings';
import { UserRolesModel } from '../../../wgo-base/authentication/models/UserRolesModel';
import { PostgresDataSource } from '../../dataSources';
import { IContext } from '../models';

const authModel = new UserRolesModel({
  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  hostBase: GetHostBaseKey(),
  dataSource: PostgresDataSource,
  tokenExpiresIn: GetExpiresInKey(),
  tokenRegisterExpiresIn: '24h',
  emailOptions: { from: GetEmailAppAddressKey() } as any,
});

const INVALID_PARAMS = 'WGO_CONTEXT_INVALID_PARAMS';

export const AppContextHandler = async (options: IContextOptions) => {
  if (!options) {
    throw new Error(INVALID_PARAMS);
  }
  const { tokenPayload, requestHeaders } = options;
  const ctx = {} as IContext;
  if (!tokenPayload) return ctx;
  const user = await authModel.getUser(parseInt(tokenPayload.userId));
  if (user) {
    ctx.user = user;
  }
  // TODO: Add context definition here
  return ctx as any;
};
