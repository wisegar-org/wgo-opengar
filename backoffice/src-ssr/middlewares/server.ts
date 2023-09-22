import { ssrMiddleware } from "quasar/wrappers";
import { run } from "@wisegar-org/wgo-base-server";
export default ssrMiddleware(async ({ app }) => {
  debugger;
  await run(app);
});
