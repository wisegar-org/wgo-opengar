import { boot } from "quasar/wrappers";
import core from "../../modules/core/boot";
import agv from "app/modules/agv/boot";

export default boot(({ app, router, store }) => {
  debugger;
  core(app, router, store);
  agv(app, router, store);
});
