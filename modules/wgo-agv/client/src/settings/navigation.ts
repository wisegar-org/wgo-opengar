import { AGVContentAdminPaths } from "src/router/paths/adminAgv/contentPaths";
import { AGVEventsAdminPaths } from "src/router/paths/adminAgv/eventsPaths";
import { AGVInscriptionsAdminPaths } from "src/router/paths/adminAgv/inscriptionsPaths";
import { AGVNewslettersAdminPaths } from "src/router/paths/adminAgv/newslettersPaths";
import { AGVTemplateAdminPaths } from "src/router/paths/adminAgv/templatePaths";
import { SUPERADMIN } from "@wisegar-org/wgo-base-models/build/authentication";
import { AuthPaths } from "@wisegar-org/wgo-base-models/build/authentication/router";
import { AdminContactPaths } from "@wisegar-org/wgo-base-models/build/contact/router";
import { MenuListItem } from "@wisegar-org/wgo-base-models/build/core/Menu";
import { AdminLanguagePaths } from "@wisegar-org/wgo-base-models/build/language/router";
import { AdminSettingsPaths } from "@wisegar-org/wgo-base-models/build/settings/router";
import { AdminTranslationPaths } from "@wisegar-org/wgo-base-models/build/translation/router";
import { Paths } from "../router/paths";

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
    icon: "mark_email_unread",
    label: AGVTemplateAdminPaths.template.label,
    status: false,
    items: [
      {
        link: AGVTemplateAdminPaths.templateInscription.path,
        color: "",
        icon: "email",
        id: AGVTemplateAdminPaths.templateInscription.name,
        type: "item",
        label: AGVTemplateAdminPaths.templateInscription.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVTemplateAdminPaths.templateInscriptionRept.path,
        color: "",
        icon: "email",
        id: AGVTemplateAdminPaths.templateInscriptionRept.name,
        type: "item",
        label: AGVTemplateAdminPaths.templateInscriptionRept.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVTemplateAdminPaths.templateEmailComitato.path,
        color: "",
        icon: "email",
        id: AGVTemplateAdminPaths.templateEmailComitato.name,
        type: "item",
        label: AGVTemplateAdminPaths.templateEmailComitato.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVTemplateAdminPaths.templateEmailContact.path,
        color: "",
        icon: "email",
        id: AGVTemplateAdminPaths.templateEmailContact.name,
        type: "item",
        label: AGVTemplateAdminPaths.templateEmailContact.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVTemplateAdminPaths.templateEmailPoll.path,
        color: "",
        icon: "email",
        id: AGVTemplateAdminPaths.templateEmailPoll.name,
        type: "item",
        label: AGVTemplateAdminPaths.templateEmailPoll.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVTemplateAdminPaths.templateNewsletterPending.path,
        color: "",
        icon: "email",
        id: AGVTemplateAdminPaths.templateNewsletterPending.name,
        type: "item",
        label: AGVTemplateAdminPaths.templateNewsletterPending.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVTemplateAdminPaths.templateNewsletterConfirmed.path,
        color: "",
        icon: "email",
        id: AGVTemplateAdminPaths.templateNewsletterConfirmed.name,
        type: "item",
        label: AGVTemplateAdminPaths.templateNewsletterConfirmed.label,
        auth: true,
        role: [SUPERADMIN],
      },
      {
        link: AGVTemplateAdminPaths.templateNewsletterCancelled.path,
        color: "",
        icon: "email",
        id: AGVTemplateAdminPaths.templateNewsletterCancelled.name,
        type: "item",
        label: AGVTemplateAdminPaths.templateNewsletterCancelled.label,
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
