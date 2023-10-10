import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const BancaPageRoute: IRouteObject = {
  path: "/banca",
  name: "agv_banca",
  label: "WGO_BANCA",
  component: () => import("../pages/BancaPage.vue"),
};
