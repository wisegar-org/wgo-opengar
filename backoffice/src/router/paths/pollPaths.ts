import { IRouteObject } from "@wisegar-org/wgo-base-models/build/core";
import { HomePageRoute } from "app/modules/agv/routes/HomePageRoute";
import { RouteRecordRaw } from "vue-router";

export const AGVPollPaths: IRouteObject = {
  pollData: {
    path: "/poll",
    label: "WGO_POLL",
    name: "agv_poll",
  },
  pollRules: {
    path: "/rules",
    label: "WGO_RULES",
    name: "agv_rules",
  },
};

export const PollPathRouter: RouteRecordRaw = {
  path: HomePageRoute.path,
  component: () => import("../../layouts/EmptyLayout.vue"),
  children: [
    {
      path: AGVPollPaths.pollData.path,
      name: AGVPollPaths.pollData.name,
      component: () => import("../../pages/Polls/PollDataPage.vue"),
    },
    {
      path: AGVPollPaths.pollRules.path,
      name: AGVPollPaths.pollRules.name,
      component: () => import("../../pages/Polls/PollRulesPage.vue"),
    },
  ],
};
