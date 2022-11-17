import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "../wgo-base/authentication/resolvers/AuthResolver";
import { LanguageResolver } from "../wgo-base/language/resolvers/LanguageResolver";
import { SettingsResolver } from "../wgo-base/settings/resolvers/SettingsResolver";
import { ContactMeResolver } from "../wgo-base/contact/resolvers/ContactMeResolver";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";
import { TemplateResolver } from "../wgo-base/template/resolvers/TemplateResolver";
import { HistoricResolver } from "../wgo-base/historic/resolvers/HistoricResolver";
import { TranslationResolver } from "../wgo-base/translation/resolvers/TranslationResolver";
import { AGVEventResolver } from "./Event/AGVEventResolver";
import { AGVContentsResolver } from "./Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "./Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "./Inscription/AGVInscriptionResolver";

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
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as NonEmptyArray<Function>;
};
