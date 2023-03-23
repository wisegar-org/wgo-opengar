import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { historicTranslations } from "./translations";

const HistoricPathsBase = `${AdminBasePath}/historic`;

export const AdminHistoricPaths: IRouteObject = {
  adminHistoric: {
    path: `${HistoricPathsBase}`,
    name: "admin_historic",
    label: historicTranslations.TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
