import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const CorsiPageRoute: IRouteObject = {
  path: "/corsi",
  name: "agv_corsi",
  label: "WGO_CORSI",
  component: () => import("../pages/CorsiPage.vue"),
};
