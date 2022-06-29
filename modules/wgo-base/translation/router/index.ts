import { IRouteObject } from "../../core/models";
import { AdminBasePath } from "../../core/router";

const TranslationPathsBase = `${AdminBasePath}/trans`;

export const AdminTranslationPaths: IRouteObject = {
  adminTranslation: {
    path: `${TranslationPathsBase}`,
    name: "admin_translation",
    label: "Translations",
  },
};
