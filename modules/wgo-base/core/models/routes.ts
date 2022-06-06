export interface IRoute {
  path: string;
  name: string;
  label: string;
}

export interface IRouteObject {
  [key: string]: IRoute;
}
