//Translations base components
import { getCoreTranslationsKeys } from "@wisegar-org/wgo-base-models/build/core";
import { getTranslationTranslationsKeys } from "@wisegar-org/wgo-base-models/build/translation";
import { getLanguageTranslationsKeys } from "@wisegar-org/wgo-base-models/build/language";
import { getAuthTranslationsKeys } from "@wisegar-org/wgo-base-models/build/authentication";
import { getSettingsTranslationsKeys } from "@wisegar-org/wgo-base-models/build/settings";
import { getContactTranslationsKeys } from "@wisegar-org/wgo-base-models/build/contact";
import { getWisegarTranslationsKeys } from "src/models";

//Project translation components

const tanslations: string[] = getCoreTranslationsKeys()
  .concat(getTranslationTranslationsKeys())
  .concat(getLanguageTranslationsKeys())
  .concat(getAuthTranslationsKeys())
  .concat(getSettingsTranslationsKeys())
  .concat(getContactTranslationsKeys())
  .concat(getWisegarTranslationsKeys());
export const Translations = tanslations;
