import VueRouter, { RouteConfig } from 'vue-router';
import { IndexAdminRoute, LoginRoute } from '../settings/RouterSettings';

export interface IRouteService {
  goTo(path: string): void;
  goBack(): void;
  getRouteUrlPath(): void;
}

export class RouteService implements IRouteService {
  private frameworkRouter: VueRouter;
  constructor(frameworkRouter: VueRouter) {
    this.frameworkRouter = frameworkRouter;
  }
  public goTo(path: string) {
    if (this.frameworkRouter.currentRoute.path !== path)
      void this.frameworkRouter.push(path);
  }
  public goBack() {
    this.frameworkRouter.back();
  }
  public getRouteUrlPath() {
    return this.frameworkRouter.currentRoute.fullPath;
  }

  public goToLoginPage() {
    void this.frameworkRouter.push(LoginRoute.path);
  }

  public goToAdminPage() {
    void this.frameworkRouter.push(IndexAdminRoute.path);
  }

  public getRouteName(route: RouteConfig) {
    if (!route.name)
      throw 'RouteService - Not find name property in RouterConfig';
    return route.name;
  }

  public isActiveRoute(activeRoute: string, path: string) {
    return activeRoute === path;
  }
}
