import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { translations } from "./translations";

const HistoricPathsBase = `${AdminBasePath}/lang`;

export const AdminHistoricPaths: IRouteObject = {
  adminLanguage: {
    path: `${HistoricPathsBase}`,
    name: "admin_historic",
    label: translations.TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
