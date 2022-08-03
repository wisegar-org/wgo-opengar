import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "../wgo-base/authentication/resolvers/AuthResolver";
import { LanguageResolver } from "../wgo-base/language/resolvers/LanguageResolver";
import { SettingsResolver } from "../wgo-base/settings/resolvers/SettingsResolver";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";
import { StorageResolver } from "../wgo-base/storage/resolvers/Storage/StorageResolver";
import { IndexContentResolver } from "./IndexContent/IndexContentResolver";
import { ContactMeResolver } from "../wgo-base/contact/resolvers/ContactMeResolver";

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
