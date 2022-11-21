import { AGVContentAdminPaths } from "src/router/paths/adminAgv/contentPaths";
import { AGVEventsAdminPaths } from "src/router/paths/adminAgv/eventsPaths";
import { AGVInscriptionsAdminPaths } from "src/router/paths/adminAgv/inscriptionsPaths";
import { AGVNewslettersAdminPaths } from "src/router/paths/adminAgv/newslettersPaths";
import { SUPERADMIN } from "src/wgo-base/authentication/models";
import { AdminContactPaths } from "src/wgo-base/contact/router";
import { MenuListItem } from "src/wgo-base/core/models/Menu";
import { AdminLanguagePaths } from "src/wgo-base/language/router";
import { AdminSettingsPaths } from "src/wgo-base/settings/router";
import { AdminTranslationPaths } from "src/wgo-base/translation/router";
import { Paths } from "../router/paths";
import { AuthPaths } from "../wgo-base/authentication/router";

export const menuItems: MenuListItem[] = [
  {
    link: Paths.home.path,
    color: "",
    icon: "home",
    id: Paths.home.name,
    type: "item",
    label: Paths.home.label,
    auth: true,
    role: [SUPERADMIN],
  },
  {
    type: "separator",
    auth: true,
    role: [SUPERADMIN],
  },
  {
    link: AGVEventsAdminPaths.events.path,
    color: "",
    icon: "event",
    id: AGVEventsAdminPaths.events.name,
    type: "item",
    label: AGVEventsAdminPaths.events.label,
    auth: true,
    role: [SUPERADMIN],
  },
  {
    link: AGVInscriptionsAdminPaths.inscriptions.path,
    color: "",
    icon: "how_to_reg",
    id: AGVInscriptionsAdminPaths.inscriptions.name,
    type: "item",
    label: AGVInscriptionsAdminPaths.inscriptions.label,
    auth: true,
    role: [SUPERADMIN],
  },
  {
    icon: "notes",
    label: AGVContentAdminPaths.content.label,
    status: false,
    items: [
      {
        link: AGVContentAdminPaths.contentComitato.path,
        color: "",
        icon: "notes",
        id: AGVContentAdminPaths.contentComitato.name,
        type: "item",
        label: AGVContentAdminPaths.contentComitato.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVContentAdminPaths.contentSocialMedia.path,
        color: "",
        icon: "notes",
        id: AGVContentAdminPaths.contentSocialMedia.name,
        type: "item",
        label: AGVContentAdminPaths.contentSocialMedia.label,
        auth: true,
        role: [SUPERADMIN],
      },
    ],
    type: "group",
    auth: true,
    role: [SUPERADMIN],
  },
  {
    type: "separator",
    auth: true,
    role: [SUPERADMIN],
  },
  {
    link: AuthPaths.authUsers.path,
    color: "",
    icon: "person",
    id: AuthPaths.authUsers.name,
    type: "item",
    label: AuthPaths.authUsers.label,
    auth: true,
    role: [SUPERADMIN],
  },
  {
    label: AdminLanguagePaths.adminLanguage.label,
    id: AdminLanguagePaths.adminLanguage.name,
    icon: "language",
    link: AdminLanguagePaths.adminLanguage.path,
    role: AdminLanguagePaths.adminLanguage.role,
    auth: AdminLanguagePaths.adminLanguage.auth,
    color: "purple",
    type: "item",
  },
  {
    label: AdminTranslationPaths.adminTranslation.label,
    id: AdminTranslationPaths.adminTranslation.name,
    icon: "translate",
    link: AdminTranslationPaths.adminTranslation.path,
    role: AdminTranslationPaths.adminTranslation.role,
    auth: AdminTranslationPaths.adminTranslation.auth,
    color: "",
    type: "item",
  },
  {
    label: AdminContactPaths.adminContact.label,
    id: AdminContactPaths.adminContact.name,
    icon: "contact_mail",
    link: AdminContactPaths.adminContact.path,
    role: AdminContactPaths.adminContact.role,
    auth: AdminContactPaths.adminContact.auth,
    color: "",
    type: "item",
  },
  {
    label: AdminSettingsPaths.adminSettings.label,
    id: AdminSettingsPaths.adminSettings.name,
    icon: "settings",
    link: AdminSettingsPaths.adminSettings.path,
    role: AdminSettingsPaths.adminSettings.role,
    auth: AdminSettingsPaths.adminSettings.auth,
    color: "",
    type: "item",
  },
  {
    icon: "how_to_reg",
    label: AGVNewslettersAdminPaths.newsletter.label,
    status: false,
    items: [
      {
        link: AGVNewslettersAdminPaths.newsletterInscriptions.path,
        color: "",
        icon: "how_to_reg",
        id: AGVNewslettersAdminPaths.newsletterInscriptions.name,
        type: "item",
        label: AGVNewslettersAdminPaths.newsletterInscriptions.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVNewslettersAdminPaths.newsletterMessages.path,
        color: "",
        icon: "message",
        id: AGVNewslettersAdminPaths.newsletterMessages.name,
        type: "item",
        label: AGVNewslettersAdminPaths.newsletterMessages.label,
        auth: true,
        role: [SUPERADMIN],
      },
    ],
    type: "group",
    auth: true,
    role: [SUPERADMIN],
  },
];
