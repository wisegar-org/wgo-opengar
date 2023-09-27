import { RouteRecordRaw } from "vue-router";

export const HomePageRoute: RouteRecordRaw = {
  path: "/",
  name: "agv_home",
  component: () => import("../pages/IndexPage.vue"),
};
