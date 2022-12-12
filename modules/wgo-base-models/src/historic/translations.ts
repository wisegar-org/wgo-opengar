import { historicServerTranslations } from "./constants";

export const translations = {
  TITLE: "WGO_HISTORIC_TITLE",
  COLUMN_ID: "WGO_HISTORIC_COLUMN_ID",
  COLUMN_ENTITY: "WGO_HISTORIC_COLUMN_ENTITY",
  COLUMN_ACTION: "WGO_HISTORIC_COLUMN_ACTION",
  COLUMN_CREATE_AT: "WGO_HISTORIC_COLUMN_CREATE_AT",
  COLUMN_MESSAGE: "WGO_HISTORIC_COLUMN_MESSAGE",
  COLUMN_USERNAME: "WGO_HISTORIC_COLUMN_USERNAME",
};

export const getHistoricTranslationsKeys = () => {
  return Object.values(translations).concat(historicServerTranslations);
};
