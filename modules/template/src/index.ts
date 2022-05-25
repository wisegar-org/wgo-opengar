import {
  IServerOptions,
  UseCorsMiddleware,
  UseGqlServer,
  UseGQLUploadExpress,
  UseJwtMiddleware,
  UseRestMiddleware,
} from "@wisegar-org/wgo-server";
import { NonEmptyArray } from "type-graphql";
import { AppController } from "./controllers/AppController";
import { AppContextHandler } from "./handlers/AppContextHandler";
import { AuthenticationHandler } from "./handlers/AuthenticationHandler";
import { errorHandler } from "./handlers/ErrorHandler";

const options: IServerOptions = {
  authenticator: AuthenticationHandler,
  context: AppContextHandler,
  controllers: [AppController],
  expiresIn: "",
  privateKey: "",
  publicKey: "",
  formatError: errorHandler,
  resolvers: [] as unknown as NonEmptyArray<Function>,
};

// UseCorsMiddleware(options);
// UseJwtMiddleware(options);
// UseRestMiddleware(options);
// const onCreatedGraphQLServer = () => {
//   UseGQLUploadExpress(options);
// };
// const onStartedGraphQLServer = (server: any, app: any) => {
//   server.applyMiddleware({ app: app });
// };
// await UseGqlServer(options, onCreatedGraphQLServer, onStartedGraphQLServer);
// if (options.middlewares) {
//   options.middlewares(options.app);
// }
