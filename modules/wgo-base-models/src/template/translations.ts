import { templateServerTranslations } from "./constants";

export const templateTranslations = {
  TITLE: "WGO_TEMPLATE_TITLE",
  TRUE: "WGO_TEMPLATE_BOOLEAN_SAVE_TRUE",
  FALSE: "WGO_TEMPLATE_BOOLEAN_SAVE_FALSE",
};

export const getTemplateTranslationsKeys = () => {
  return Object.values(templateTranslations).concat(templateServerTranslations);
};
