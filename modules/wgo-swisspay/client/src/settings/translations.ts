import { translations as transCore } from '../../../../wgo-base/core/models';
import { translations as transTranslations } from '../../../../wgo-base/translation/models/translations';

const tanslations: string[] = Object.values(transCore).concat(Object.values(transTranslations));

export const Translations = tanslations;
