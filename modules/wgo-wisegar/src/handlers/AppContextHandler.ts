import { IContextOptions } from "@wisegar-org/wgo-server";
import {
  GetCypherKey,
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from "@wisegar-org/wgo-settings";
import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";
import { translations } from "@wisegar-org/wgo-base-models/build/core";
import { UserRolesModel, listenersEvents } from "@wisegar-org/wgo-base-server";
import { PostgresDataSource } from "../dataSources";
import { IContextBase } from "@wisegar-org/wgo-base-models/build/core";
import { GetWebRootKey } from "../middlewares/HostClientMiddleware";
import { EventEmitter } from "events";
import { FinanceIssuesToken, FinanceIssuesZincTime } from "../models/Finance";

export const ctx = {
  dataSource: PostgresDataSource,
  web_root: GetWebRootKey(),
  emiter: new EventEmitter(),
  listenersEvents: listenersEvents.concat([
    FinanceIssuesZincTime,
    FinanceIssuesToken,
  ]),
  cypherKey: GetCypherKey(),
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
