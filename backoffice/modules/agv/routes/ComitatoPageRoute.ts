import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const ComitatoPageRoute: IRouteObject = {
  path: "/comitato",
  name: "agv_comitato",
  label: "WGO_COMITATO",
  component: () => import("../pages/ComitatoPage.vue"),
};
