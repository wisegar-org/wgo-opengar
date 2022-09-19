import { IContextOptions } from "@wisegar-org/wgo-server";
import {
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from "@wisegar-org/wgo-settings";
import { SUPERADMIN } from "../wgo-base/authentication/models";
import { translations } from "../wgo-base/core/models";
import { UserRolesModel } from "../wgo-base/authentication/models/UserRolesModel";
import { PostgresDataSource } from "../dataSources";
import { IContextBase } from "../wgo-base/core/models/context";
import { GetWebRootKey } from "../middlewares/HostClientMiddleware";
import { EventEmitter } from "events";

export const ctx = {
  dataSource: PostgresDataSource,
  web_root: GetWebRootKey(),
  emiter: new EventEmitter(),
} as IContextBase;

const authModel = new UserRolesModel({
  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  hostBase: GetHostBaseKey(),
  ctx,
  tokenExpiresIn: GetExpiresInKey(),
  tokenRegisterExpiresIn: "24h",
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
    language: parseInt(requestHeaders.language) || 0,
  };
  if (!tokenPayload) return ctxApp;
  const user = await authModel.getUser(parseInt(tokenPayload.userId));
  if (user) {
    ctxApp.user = user;
    ctxApp.user.isSuperAdmin = user.roles.indexOf(SUPERADMIN) !== -1;
  }
  // TODO: Add context definition here
  return ctxApp as any;
};
