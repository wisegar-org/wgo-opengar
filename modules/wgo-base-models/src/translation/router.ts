import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { transTranslations } from "./translations";

const TranslationPathsBase = `${AdminBasePath}/trans`;

export const AdminTranslationPaths: IRouteObject = {
  adminTranslation: {
    path: `${TranslationPathsBase}`,
    name: "admin_translation",
    label: transTranslations.TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
