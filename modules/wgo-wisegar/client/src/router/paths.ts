import { AdminBasePath } from "src/wgo-base/core/router";
import { IRouteObject, translations } from "../wgo-base/core/models";

export const Paths: IRouteObject = {
  home: {
    path: "/",
    label: translations.HOME,
    name: "home",
    auth: false,
  },
  adminIndexContent: {
    path: `${AdminBasePath}/indexContent`,
    label: "TRADUCIR",
    name: "adminIndexContent",
    auth: true,
  },
};
