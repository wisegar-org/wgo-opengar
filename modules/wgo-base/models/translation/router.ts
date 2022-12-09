import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { translations } from "./translations";

const TranslationPathsBase = `${AdminBasePath}/trans`;

export const AdminTranslationPaths: IRouteObject = {
  adminTranslation: {
    path: `${TranslationPathsBase}`,
    name: "admin_translation",
    label: translations.TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
