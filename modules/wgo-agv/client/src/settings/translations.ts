//Translations base components

import { getAuthTranslationsKeys } from "@wisegar-org/wgo-base-models/build/authentication/translations";
import { getContactTranslationsKeys } from "@wisegar-org/wgo-base-models/build/contact/translations";
import { getCoreTranslationsKeys } from "@wisegar-org/wgo-base-models/build/core";
import { getLanguageTranslationsKeys } from "@wisegar-org/wgo-base-models/build/language/translations";
import { getSettingsTranslationsKeys } from "@wisegar-org/wgo-base-models/build/settings/translations";
import { getTranslationTranslationsKeys } from "@wisegar-org/wgo-base-models/build/translation/translations";

//Project translation components

const tanslations: string[] = getCoreTranslationsKeys()
  .concat(getTranslationTranslationsKeys())
  .concat(getLanguageTranslationsKeys())
  .concat(getAuthTranslationsKeys())
  .concat(getSettingsTranslationsKeys())
  .concat(getContactTranslationsKeys());
export const Translations = tanslations;
