import { SUPERADMIN } from "../../authentication/models";
import { IRouteObject } from "../../core/models";
import { AdminBasePath } from "../../core/router";
import { translations } from "../models/translations";

const SettingsPathsBase = `${AdminBasePath}/settings`;

export const AdminSettingsPaths: IRouteObject = {
  adminSettings: {
    path: `${SettingsPathsBase}`,
    name: "admin_settings",
    label: translations.TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
