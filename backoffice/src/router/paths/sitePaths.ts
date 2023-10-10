import { IRouteObject } from "@wisegar-org/wgo-base-models/build/core";
import { RouteRecordRaw } from "vue-router";
import { HomePageRoute } from "../../../modules/agv/routes/HomePageRoute";

export const AGVPaths: IRouteObject = {
  comitato: {
    path: "/comitato",
    label: "WGO_COMITATO",
    name: "agv_comitato",
  },
  corsi: {
    path: "/corsi",
    label: "WGO_CORSI",
    name: "agv_corsi",
  },
  eventi: {
    path: "/eventi",
    label: "WGO_EVENTI",
    name: "agv_eventi",
  },
  links: {
    path: "/links",
    label: "WGO_LINK_UTILI",
    name: "agv_links",
  },
};

export const SitePathRouter: RouteRecordRaw = {
  path: HomePageRoute.path,
  component: () => import("../../layouts/SiteMainLayout.vue"),
  children: [],
};
