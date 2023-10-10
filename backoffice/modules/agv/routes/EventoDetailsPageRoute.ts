import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const EventoDetailsPageRoute: IRouteObject = {
  path: "/evento-details",
  name: "agv_evento_details",
  label: "WGO_EVENTO_DETAILS",
  component: () => import("../pages/DetailsPage.vue"),
};
