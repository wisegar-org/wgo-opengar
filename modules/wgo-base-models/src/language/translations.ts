import { languageServerTranslations } from "./constants";

export const translations = {
  TITLE: "WGO_LANGUAGE_TITLE",
  TITLE_DIALOG: "WGO_LANGUAGE_TITLE_DIALOG",
  COLUMN_ID: "WGO_LANGUAGE_COLUMN_ID",
  COLUMN_CODE: "WGO_LANGUAGE_COLUMN_CODE",
  COLUMN_ENABLED: "WGO_LANGUAGE_COLUMN_ENABLED",
  COLUMN_DEFAULT: "WGO_LANGUAGE_COLUMN_DEFAULT",
  ADD_SUCCESS: "WGO_LANGUAGE_ADD_SUCCESS_MSG",
  EDIT_SUCCESS: "WGO_LANGUAGE_EDIT_SUCCESS_MSG",
};

export const getLanguageTranslationsKeys = () => {
  return Object.values(translations).concat(languageServerTranslations);
};
