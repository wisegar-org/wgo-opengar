import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { AuthResolver } from "./Auth/AuthResolver";
import { LanguageResolver } from "./Language/LanguageResolver";
import { SettingsResolver } from "./Settings/SettingsResolver";
import { TranslationResolver } from "./Translation/TranslationResolver";

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    LanguageResolver,
    TranslationResolver,
    SettingsResolver,
  ] as NonEmptyArray<Function>;
};
