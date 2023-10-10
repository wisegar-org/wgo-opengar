import { IRouteObject } from "@wisegar-org/wgo-base-models/build/core";
import { RouteRecordRaw } from "vue-router";
import { HomePageRoute } from "app/modules/agv/routes/HomePageRoute";
import { CorsoDetailsPageRoute } from "app/modules/agv/routes/CorsoDetailsPageRoute";
import { EventoDetailsPageRoute } from "app/modules/agv/routes/EventoDetailsPageRoute";

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
      path: CorsoDetailsPageRoute.path,
      props: (route) => ({ itemId: parseInt(`${route.query.id}` || "0") }),
      component: () => import("../../../modules/agv/pages/DetailsPage.vue"),
    },
    {
      path: EventoDetailsPageRoute.path,
      props: (route) => ({ itemId: parseInt(`${route.query.id}` || "0") }),
      component: () => import("../../../modules/agv/pages/DetailsPage.vue"),
    },
  ],
};
