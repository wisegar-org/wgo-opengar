import { ssrMiddleware } from "quasar/wrappers";
import { run } from "@wisegar-org/wgo-base-server";
import { AppVersionsController } from "../../modules/core/controllers/AppController";
export default ssrMiddleware(async ({ app }) => {
  const controllers = [AppVersionsController];
  await run(app, controllers);
});
