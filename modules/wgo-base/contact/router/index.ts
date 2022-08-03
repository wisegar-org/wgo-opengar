import { SUPERADMIN } from "../../authentication/models";
import { IRouteObject } from "../../core/models";
import { AdminBasePath } from "../../core/router";
import { translations } from "../models/translations";

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
