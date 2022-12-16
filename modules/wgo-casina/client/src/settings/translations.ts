//Translations base components
import { getCoreTranslationsKeys } from '@wisegar-org/wgo-base-models';
import { getTranslationTranslationsKeys } from '@wisegar-org/wgo-base-models';
import { getLanguageTranslationsKeys } from '@wisegar-org/wgo-base-models';
import { getAuthTranslationsKeys } from '@wisegar-org/wgo-base-models';
import { getSettingsTranslationsKeys } from '@wisegar-org/wgo-base-models';
import { getCasinaTranslationsKeys } from 'src/models/translations';
import { getContactTranslationsKeys } from '@wisegar-org/wgo-base-models';

//Project translation components

const tanslations: string[] = getCoreTranslationsKeys()
  .concat(getTranslationTranslationsKeys())
  .concat(getLanguageTranslationsKeys())
  .concat(getAuthTranslationsKeys())
  .concat(getSettingsTranslationsKeys())
  .concat(getContactTranslationsKeys())
  .concat(getCasinaTranslationsKeys());
export const Translations = tanslations;
