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

export const getResolverList = () => {
  const agvResolvers = getAGVResolvers();
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
    agvResolvers,
  ] as unknown as NonEmptyArray<Function>;
};
