import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "@wisegar-org/wgo-base-server";
import { LanguageResolver } from "@wisegar-org/wgo-base-server";
import { SettingsResolver } from "@wisegar-org/wgo-base-server";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";
import { StorageResolver } from "@wisegar-org/wgo-base-server";
import { IndexContentResolver } from "./IndexContent/IndexContentResolver";
import { ContactMeResolver } from "@wisegar-org/wgo-base-server";

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    PublicMediaResolver,
    StorageResolver,
    ContactMeResolver,
    IndexContentResolver,
  ] as NonEmptyArray<Function>;
};
