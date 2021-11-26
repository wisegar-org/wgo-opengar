import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import routes from './routes';
import { Store } from 'vuex';
import { StateInterface } from '../store';
import { LocalStorageSettings } from '../modules/wgo/settings/LocalStorageSettings';
import { RouteRecord } from 'vue-router';
import { LoginRoute } from '../modules/wgo/settings/RouterSettings';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    if (
      to.matched.some(
        (record: RouteRecord) =>
          record &&
          record.meta &&
          !!(record.meta as { requiresAuth: boolean }).requiresAuth
      )
    ) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      const token = localStorage.getItem(LocalStorageSettings.KEY_AUTH_TOKEN);
      token
        ? next()
        : next({
            path: LoginRoute.path,
            query: to.matched.some(
              (record: RouteRecord) =>
                record &&
                record.meta &&
                !!(record.meta as { loginReturn: boolean }).loginReturn
            )
              ? { toPath: to.path }
              : {}
          });
    } else {
      next(); // make sure to always call next()!
    }
  });

  return Router;
});
