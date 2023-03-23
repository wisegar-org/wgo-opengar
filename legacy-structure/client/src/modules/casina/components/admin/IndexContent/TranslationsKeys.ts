import { ITranslations } from '../../../../wgo/models';

export const TranslationIndexContentKey = 'CASINA_INDEX_CONTENT_TEXT';
export const TranslationIndexServicesKey = 'CASINA_INDEX_SERVICES_TEXT';
export const TranslationIndexDoctorsKey = 'CASINA_INDEX_DOCTORS_TEXT';

export interface ITranslationIndexContentKeys extends ITranslations {
  CASINA_INDEX_CONTENT_TITLE: string;
  CASINA_INDEX_CONTENT_TITLE_BC: string;
  [TranslationIndexContentKey]: string;
  [TranslationIndexServicesKey]: string;
  [TranslationIndexDoctorsKey]: string;
  CASINA_INDEX_CONTENT_SUCCESS_EDIT: string;
  CASINA_INDEX_CONTENT_FAIL_EDIT: string;
}

export const TranslationsKeys = {
  CASINA_INDEX_CONTENT_TITLE: true,
  CASINA_INDEX_CONTENT_TITLE_BC: true,
  [TranslationIndexContentKey]: false,
  [TranslationIndexServicesKey]: false,
  [TranslationIndexDoctorsKey]: false,
  CASINA_INDEX_CONTENT_SUCCESS_EDIT: true,
  CASINA_INDEX_CONTENT_FAIL_EDIT: true
};
