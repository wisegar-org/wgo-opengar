import { SUPERADMIN } from "../../authentication/models";
import { IRouteObject } from "../../core/models";
import { AdminBasePath } from "../../core/router";
import { translations } from "../models/translations";

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
