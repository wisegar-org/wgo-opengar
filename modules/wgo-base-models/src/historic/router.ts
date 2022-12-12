import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { historicTranslations } from "./translations";

const HistoricPathsBase = `${AdminBasePath}/lang`;

export const AdminHistoricPaths: IRouteObject = {
  adminLanguage: {
    path: `${HistoricPathsBase}`,
    name: "admin_historic",
    label: historicTranslations.TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
