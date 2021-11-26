import VueRouter from 'vue-router';
import { LoginRoute } from '../settings/RouterSettings'

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
    void this.frameworkRouter.push(LoginRoute.path)
  }
}
