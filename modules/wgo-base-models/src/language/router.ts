import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { translations } from "./translations";

const LanguagePathsBase = `${AdminBasePath}/lang`;

export const AdminLanguagePaths: IRouteObject = {
  adminLanguage: {
    path: `${LanguagePathsBase}`,
    name: "admin_language",
    label: translations.TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
