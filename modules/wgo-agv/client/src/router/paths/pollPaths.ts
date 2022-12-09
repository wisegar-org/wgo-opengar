import { IRouteObject } from "src/wgo-base/models/core";
import { RouteRecordRaw } from "vue-router";
import { AGVPaths } from "./sitePaths";

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
  path: AGVPaths.home.path,
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
