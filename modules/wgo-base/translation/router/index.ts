import { SUPERADMIN } from "../../authentication/models";
import { IRouteObject } from "../../core/models";
import { AdminBasePath } from "../../core/router";
import { translations } from "../models/translations";

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
