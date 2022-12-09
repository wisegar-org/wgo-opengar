import { SUPERADMIN } from "../authentication";
import { AdminBasePath, IRouteObject } from "../core/router";
import { translations } from "./translations";

const ContactPathsBase = `${AdminBasePath}/contact`;

export const AdminContactPaths: IRouteObject = {
  adminContact: {
    path: `${ContactPathsBase}`,
    name: "admin_contact",
    label: translations.CONTACT_ADM_TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
