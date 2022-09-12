//Translations base components
import { getCoreTranslationsKeys } from '../wgo-base/core/models';
import { getTranslationTranslationsKeys } from '../wgo-base/translation/models/translations';
import { getLanguageTranslationsKeys } from '../wgo-base/language/models/translations';
import { getAuthTranslationsKeys } from '../wgo-base/authentication/models/translations';
import { getSettingsTranslationsKeys } from '../wgo-base/settings/models/translations';

//Project translation components

const tanslations: string[] = getCoreTranslationsKeys()
  .concat(getTranslationTranslationsKeys())
  .concat(getLanguageTranslationsKeys())
  .concat(getAuthTranslationsKeys())
  .concat(getSettingsTranslationsKeys());
export const Translations = tanslations;
