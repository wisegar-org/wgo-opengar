import { serverTranslations } from "./constants";

export const translations = {
  TITLE: "WGO_SETTINGS_TITLE",
  COLUMN_ID: "WGO_SETTINGS_COLUMN_ID",
  COLUMN_KEY: "WGO_SETTINGS_COLUMN_KEY",
  COLUMN_VALUE: "WGO_SETTINGS_COLUMN_VALUE",
};

export const getSettingsTranslationsKeys = () => {
  return Object.values(translations).concat(serverTranslations);
};
