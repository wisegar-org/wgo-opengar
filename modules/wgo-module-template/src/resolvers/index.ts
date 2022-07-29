import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "../wgo-base/authentication/resolvers/AuthResolver";
import { LanguageResolver } from "../wgo-base/language/resolvers/LanguageResolver";
import { SettingsResolver } from "../wgo-base/settings/resolvers/SettingsResolver";
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
  ] as NonEmptyArray<Function>;
};