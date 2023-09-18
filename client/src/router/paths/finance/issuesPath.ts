import { Paths } from "src/router/paths";
import { financeMenuItems } from "src/settings/navigation";
import { RouteRecordRaw } from "vue-router";
import { FinanceBasePath } from ".";

export const FinanceIssuesPathRouter: RouteRecordRaw = {
  path: Paths.financeIssues.path,
  name: Paths.financeIssues.name,
  component: () => import("layouts/MainLayout.vue"),
  props: () => {
    const items = financeMenuItems;
    return {
      menuItems: items,
      maxWidth: "100%",
    };
  },
  children: [
    {
      path: FinanceBasePath,
      redirect: Paths.financeIssues.path,
    },
    {
      path: Paths.financeIssues.path,
      component: () => import("pages/Finance/IssuesPage.vue"),
      meta: {
        auth: Paths.financeIssues.auth,
        role: Paths.financeIssues.role,
      },
    },
  ],
};
