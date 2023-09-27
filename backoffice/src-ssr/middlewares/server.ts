import { ssrMiddleware } from "quasar/wrappers";
import { run } from "@wisegar-org/wgo-base-server";
import { AppVersionsController } from "../../modules/core/controllers/AppController";
// import { AppResolver } from "../../modules/core/resolvers/AppResolver";
export default ssrMiddleware(async ({ app }) => {
  const controllers = [AppVersionsController];
  // const resolvers = [AppResolver];
  await run(app, controllers);
});
