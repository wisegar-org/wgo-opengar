//Translations base components

import { getAuthTranslationsKeys } from "src/wgo-base/models/authentication/translations";
import { getContactTranslationsKeys } from "src/wgo-base/models/contact/translations";
import { getCoreTranslationsKeys } from "src/wgo-base/models/core";
import { getLanguageTranslationsKeys } from "src/wgo-base/models/language/translations";
import { getSettingsTranslationsKeys } from "src/wgo-base/models/settings/translations";
import { getTranslationTranslationsKeys } from "src/wgo-base/models/translation/translations";

//Project translation components

const tanslations: string[] = getCoreTranslationsKeys()
  .concat(getTranslationTranslationsKeys())
  .concat(getLanguageTranslationsKeys())
  .concat(getAuthTranslationsKeys())
  .concat(getSettingsTranslationsKeys())
  .concat(getContactTranslationsKeys());
export const Translations = tanslations;
