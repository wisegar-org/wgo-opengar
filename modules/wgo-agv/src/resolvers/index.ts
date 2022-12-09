import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";
import { AGVEventResolver } from "./Event/AGVEventResolver";
import { AGVContentsResolver } from "./Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "./Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "./Inscription/AGVInscriptionResolver";
import { EmailResolver } from "../wgo-base/server/email/resolvers/EmailResolver";
import { AuthResolver } from "../wgo-base/server/authentication/resolvers/AuthResolver";
import { LanguageResolver } from "../wgo-base/server/language/resolvers/LanguageResolver";
import { SettingsResolver } from "../wgo-base/server/settings/resolvers/SettingsResolver";
import { ContactMeResolver } from "../wgo-base/server/contact/resolvers/ContactMeResolver";
import { TemplateResolver } from "../wgo-base/server/template/resolvers/TemplateResolver";
import { HistoricResolver } from "../wgo-base/server/historic/resolvers/HistoricResolver";
import { TranslationResolver } from "../wgo-base/server/translation/resolvers/TranslationResolver";

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
