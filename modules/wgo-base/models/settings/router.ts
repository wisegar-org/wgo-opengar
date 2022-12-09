import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { translations } from "./translations";

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
