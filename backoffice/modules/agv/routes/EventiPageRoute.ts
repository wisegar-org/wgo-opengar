import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const EventiPageRoute: IRouteObject = {
  path: "/eventi",
  name: "agv_eventi",
  label: "WGO_EVENTI",
  component: () => import("../pages/EventiPage.vue"),
};
