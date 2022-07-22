export interface IRoute {
  path: string;
  name: string;
  label: string;
  auth?: boolean;
  role?: string[];
}

export interface IRouteObject {
  [key: string]: IRoute;
}
