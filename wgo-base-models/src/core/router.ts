import { SUPERADMIN } from "../authentication";
import { translations } from "./translations";

export const AdminBasePath = "/admin";

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

export const AdminPaths: IRouteObject = {
  admin: {
    path: `${AdminBasePath}`,
    name: "admin",
    label: translations.APP_ADMIN_TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
