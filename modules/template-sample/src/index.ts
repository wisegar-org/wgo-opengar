import "reflect-metadata";
import {
  boot,
  IServerOptions,
  NonEmptyArray,
  UseRestMiddleware,
} from "@wisegar-org/wgo-server";
import {
  GetPortKey,
  GetNodeEnvKey,
  GetPrivateKey,
  GetPublicKey,
  GetExpiresInKey,
} from "@wisegar-org/wgo-settings";
import { AuthenticationHandler } from "./handlers/AuthenticationHandler";
import { AppContextHandler } from "./handlers/AppContextHandler";
import { errorHandler } from "./handlers/ErrorHandler";
import { AppController } from "./controllers/AppController";
import { AppResolver } from "./resolvers/AppResolver";
import { UseClientSPAHostMiddleware } from "./middlewares/HostClientMiddleware";

const port = GetPortKey();
const environment = GetNodeEnvKey();

const serverOptions: IServerOptions = {
  authenticator: AuthenticationHandler,
  context: AppContextHandler,
  formatError: errorHandler,
  controllers: [AppController],
  port: parseInt(port),
  maxFileSize: 5000000000,
  maxFiles: 10,
  useCors: true,
  middlewares: (app) => {
    UseClientSPAHostMiddleware(app);
    UseRestMiddleware(serverOptions);
  },
  resolvers: [AppResolver] as unknown as NonEmptyArray<Function>,
  privateKey: GetPrivateKey(),
  publicKey: GetPublicKey(),
  expiresIn: GetExpiresInKey(),
};
boot(serverOptions, () => {
  console.log("Start other services here. ex. database connections");
});
