import { translations, IRouteObject } from "../wgo-base/models/core";

export const Paths: IRouteObject = {
  home: {
    path: "/",
    label: translations.HOME,
    name: "home",
    auth: false,
  },
};
