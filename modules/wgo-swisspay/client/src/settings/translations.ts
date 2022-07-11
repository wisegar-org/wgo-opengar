//Translations base components
import { translations as transCore } from '../../../../wgo-base/core/models';
import { translations as transTranslations } from '../../../../wgo-base/translation/models/translations';

//Project translation components
import { translations as emailMediaTranslations } from '../components/EmailMedia/translations';

const tanslations: string[] = Object.values(transCore)
  .concat(Object.values(transTranslations))
  .concat(Object.values(emailMediaTranslations));

export const Translations = tanslations;
