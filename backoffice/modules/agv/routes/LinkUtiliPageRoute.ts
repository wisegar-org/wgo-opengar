import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const LinkUtiliPageRoute: IRouteObject = {
  path: "/links",
  name: "agv_links",
  label: "WGO_LINKS",
  component: () => import("../pages/LinkUtiliPage.vue"),
};
