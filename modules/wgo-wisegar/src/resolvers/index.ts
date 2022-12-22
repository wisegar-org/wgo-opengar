import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "@wisegar-org/wgo-base-server";
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

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
    MediaResolver,
    StorageResolver,
    IndexContentResolver,
    FinanceIssuesResolver,
    FinanceIssuesOptionsResolver,
  ] as NonEmptyArray<Function>;
};
