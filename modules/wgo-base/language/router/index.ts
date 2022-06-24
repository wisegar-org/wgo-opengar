import { IRouteObject } from "../../core/models";
import { AdminBasePath } from "../../core/router";

const LanguagePathsBase = `${AdminBasePath}/lang`;

export const AdminLanguagePaths: IRouteObject = {
  adminLanguage: {
    path: `${LanguagePathsBase}`,
    name: "admin_language",
    label: "Languages",
  },
};
