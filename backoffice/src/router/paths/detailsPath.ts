import { IRouteObject } from "@wisegar-org/wgo-base-models/build/core";
import { RouteRecordRaw } from "vue-router";
import { HomePageRoute } from "app/modules/agv/routes/HomePageRoute";

export const AGVDetailsPaths: IRouteObject = {
  newsInscription: {
    path: "/subscription",
    name: "agv_new_iscrizione",
    label: "WGO_NEW_INSCRIPTION",
  },
};

export const DetailsPathRouter: RouteRecordRaw = {
  path: HomePageRoute.path,
  component: () => import("../../layouts/SiteMainLayout.vue"),
  children: [
    {
      path: AGVDetailsPaths.corsiDetails.path,
      props: (route) => ({ itemId: parseInt(`${route.query.id}` || "0") }),
      component: () => import("../../pages/Details/DetailsPage.vue"),
    },
    {
      path: AGVDetailsPaths.eventiDetails.path,
      props: (route) => ({ itemId: parseInt(`${route.query.id}` || "0") }),
      component: () => import("../../pages/Details/DetailsPage.vue"),
    },
  ],
};
