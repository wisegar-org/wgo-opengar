import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { languageTranslations } from "./translations";

const LanguagePathsBase = `${AdminBasePath}/lang`;

export const AdminLanguagePaths: IRouteObject = {
  adminLanguage: {
    path: `${LanguagePathsBase}`,
    name: "admin_language",
    label: languageTranslations.TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
