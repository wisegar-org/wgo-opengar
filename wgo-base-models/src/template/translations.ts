import { templateServerTranslations } from "./constants";

export const templateTranslations = {
  TITLE: "WGO_TEMPLATE_TITLE",
  TRUE: "WGO_TEMPLATE_BOOLEAN_SAVE_TRUE",
  FALSE: "WGO_TEMPLATE_BOOLEAN_SAVE_FALSE",
  SEND_TEST: "WGO_TEMPLATE_SEND_TEST",
  SAVE_SUCCESS: "WGO_TEMPLATE_SAVE_SUCCESS",
  SAVE_FAIL: "WGO_TEMPLATE_SAVE_FAIL",
  SEND_SUCCESS: "WGO_TEMPLATE_SEND_TEST_SUCCESS",
  SEND_FAIL: "WGO_TEMPLATE_SEND_TEST_FAIL",
};

export const getTemplateTranslationsKeys = () => {
  return Object.values(templateTranslations).concat(templateServerTranslations);
};
