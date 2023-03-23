import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "@wisegar-org/wgo-base-server";
import { LanguageResolver } from "@wisegar-org/wgo-base-server";
import { SettingsResolver } from "@wisegar-org/wgo-base-server";
import { ContactMeResolver } from "@wisegar-org/wgo-base-server";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
  ] as NonEmptyArray<Function>;
};
