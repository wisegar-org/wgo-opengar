import { NonEmptyArray } from "type-graphql";
import {
  AuthResolver,
  CoreResolver,
  EmailResolver,
  HistoricResolver,
  TemplateResolver,
  TranslationResolver,
} from "@wisegar-org/wgo-base-server";
import { LanguageResolver } from "@wisegar-org/wgo-base-server";
import { SettingsResolver } from "@wisegar-org/wgo-base-server";
import { ContactMeResolver } from "@wisegar-org/wgo-base-server";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";
import { MediaResolver } from "@wisegar-org/wgo-base-server";
import { StorageResolver } from "@wisegar-org/wgo-base-server";
import { IndexContentResolver } from "./IndexContent/IndexContentResolver";
import { FinanceIssuesResolver } from "./FinanceIssues/FinanceIssuesResolver";
import { FinanceIssuesOptionsResolver } from "./FinanceIssuesOptions/FinanceIssuesOptionsResolver";
import { getAGVResolvers } from "../../modules";
import { AGVEventResolver } from "../../modules/resolvers/Event/AGVEventResolver";
import { AGVContentsResolver } from "../../modules/resolvers/Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "../../modules/resolvers/Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "../../modules/resolvers/Inscription/AGVInscriptionResolver";

export const getResolverList = () => {
  return [
    AppResolver,
    CoreResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
    TemplateResolver,
    TranslationResolver,
    HistoricResolver,
    MediaResolver,
    EmailResolver,
    StorageResolver,
    IndexContentResolver,
    FinanceIssuesResolver,
    FinanceIssuesOptionsResolver,
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as unknown as NonEmptyArray<Function>;
};
