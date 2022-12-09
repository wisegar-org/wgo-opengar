import { IRouteObject } from "@wisegar-org/wgo-base-models/build/core";
import { RouteRecordRaw } from "vue-router";

export const AGVPaths: IRouteObject = {
  home: {
    path: "/",
    label: "WGO_HOME",
    name: "agv_home",
  },
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
  contatto: {
    path: "/contatto",
    label: "WGO_CONTATTO",
    name: "agv_contatto",
  },
};

export const SitePathRouter: RouteRecordRaw = {
  path: AGVPaths.home.path,
  component: () => import("../../layouts/SiteMainLayout.vue"),
  children: [
    {
      path: AGVPaths.home.path,
      name: AGVPaths.home.name,
      component: () => import("src/pages/IndexPage.vue"),
    },
    {
      path: AGVPaths.comitato.path,
      name: AGVPaths.comitato.name,
      component: () => import("src/pages/Site/ComitatoPage.vue"),
    },
    {
      path: AGVPaths.corsi.path,
      name: AGVPaths.corsi.name,
      component: () => import("src/pages/Site/CorsiPage.vue"),
    },
    {
      path: AGVPaths.eventi.path,
      name: AGVPaths.eventi.name,
      component: () => import("src/pages/Site/EventiPage.vue"),
    },
    {
      path: AGVPaths.links.path,
      name: AGVPaths.links.name,
      component: () => import("src/pages/Site/LinkUtiliPage.vue"),
    },
    {
      path: AGVPaths.contatto.path,
      name: AGVPaths.contatto.name,
      component: () => import("src/pages/Site/ContattoPage.vue"),
    },
  ],
};
