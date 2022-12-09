import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";
import { AGVEventResolver } from "./Event/AGVEventResolver";
import { AGVContentsResolver } from "./Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "./Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "./Inscription/AGVInscriptionResolver";
import { EmailResolver } from "@wisegar-org/wgo-base-server/build/email/resolvers/EmailResolver";
import { AuthResolver } from "@wisegar-org/wgo-base-server/build/authentication/resolvers/AuthResolver";
import { LanguageResolver } from "@wisegar-org/wgo-base-server/build/language/resolvers/LanguageResolver";
import { SettingsResolver } from "@wisegar-org/wgo-base-server/build/settings/resolvers/SettingsResolver";
import { ContactMeResolver } from "@wisegar-org/wgo-base-server/build/contact/resolvers/ContactMeResolver";
import { TemplateResolver } from "@wisegar-org/wgo-base-server/build/template/resolvers/TemplateResolver";
import { HistoricResolver } from "@wisegar-org/wgo-base-server/build/historic/resolvers/HistoricResolver";
import { TranslationResolver } from "@wisegar-org/wgo-base-server/build/translation/resolvers/TranslationResolver";

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
    TemplateResolver,
    HistoricResolver,
    TranslationResolver,
    EmailResolver,
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as NonEmptyArray<Function>;
};
