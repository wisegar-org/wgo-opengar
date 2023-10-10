import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const ContattoPageRoute: IRouteObject = {
  path: "/contatto",
  name: "agv_contatto",
  label: "WGO_CONTATTO",
  component: () => import("../pages/ContattoPage.vue"),
};
