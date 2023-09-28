/* eslint-disable @typescript-eslint/no-explicit-any */
import { provideRouterService } from "./services/RouterService";

export default function core(app: any, router: any, store: any) {
  console.log(app, router, store);
  provideRouterService(app, router);
}
