import { IRouteObject } from "app/modules/core/models/IRouteObject";

export const CorsoDetailsPageRoute: IRouteObject = {
  path: "/corso-details",
  name: "agv_corso_details",
  label: "WGO_CORSO_DETAILS",
  component: () => import("../pages/DetailsPage.vue"),
};
