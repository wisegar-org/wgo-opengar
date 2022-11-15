import { SUPERADMIN } from "../../authentication/models";
import { IRouteObject } from "../../core/models";
import { AdminBasePath } from "../../core/router";
import { translations } from "../models/translations";

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
