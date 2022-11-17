import { IRouteObject } from "src/wgo-base/core/models";

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
