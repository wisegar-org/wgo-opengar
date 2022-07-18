//Translations base components
import { translations as transCore } from '../../../../wgo-base/core/models';
import { translations as transTranslations } from '../../../../wgo-base/translation/models/translations';
import { translations as languageTranslations } from '../../../../wgo-base/language/models/translations';
import { translations as authTranslations } from '../../../../wgo-base/authentication/models/translations';

//Project translation components
import { translations as emailMediaTranslations } from '../components/EmailMedia/translations';
import { translations as employeesTranslations } from '../components/Employees/translations';

const tanslations: string[] = Object.values(transCore)
  .concat(Object.values(transTranslations))
  .concat(Object.values(languageTranslations))
  .concat(Object.values(authTranslations))
  .concat(Object.values(emailMediaTranslations))
  .concat(Object.values(employeesTranslations));
export const Translations = tanslations;
