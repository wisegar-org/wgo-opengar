import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const HomePageRoute: IRouteObject = {
  path: "/",
  name: "agv_home",
  label: "WGO_HOME",
  component: () => import("../pages/IndexPage.vue"),
};
