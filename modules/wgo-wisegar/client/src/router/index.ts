import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication";
import { route } from "quasar/wrappers";
import { useAuthStore } from "src/stores/authStore";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const getBeforeEachFnc = (authStore: any) => {
  return (to: any, from: any, next: any) => {
    if (
      (to.meta.auth && !authStore.getAppToken()) ||
      (to.meta.role && !authStore.isUserInRole(to.meta.role))
    ) {
      next({
        path: AuthPaths.authLogin.path,
        query: { path: to.fullPath },
      });
    } else {
      next();
    }
  };
};

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });
  const authStore = useAuthStore(store);
  const beforeEach = getBeforeEachFnc(authStore.authStore);
  Router.beforeEach(beforeEach);

  return Router;
});
