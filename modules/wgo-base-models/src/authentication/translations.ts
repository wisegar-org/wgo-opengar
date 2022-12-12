import { authServerTranslations } from "./constants";

export const translations = {
  LOGIN_TITLE: "WGO_AUTH_LOGIN_TITLE",
  USER_LB: "WGO_AUTH_USER_LB",
  PASSWORD_LB: "WGO_AUTH_PASSWORD_LB",
  GO_TO_RESET: "WGO_AUTH_GO_TO_RESET_PASSWORD",
  GO_TO_REGISTER: "WGO_AUTH_GO_TO_REGISTER",
  CONFIRM_PASSWORD_LB: "WGO_AUTH_CONFIRM_PASSWORD_LB",

  REGISTER_TITLE: "WGO_AUTH_REGISTER_TITLE",
  REGISTER_LB: "WGO_AUTH_REGISTER_LB",
  COLUMN_ID: "WGO_AUTH_COLUMN_ID",
  COLUMN_NAME: "WGO_AUTH_COLUMN_NAME",
  COLUMN_LAST_NAME: "WGO_AUTH_COLUMN_LAST_NAME",
  COLUMN_EMAIL: "WGO_AUTH_COLUMN_EMAIL",
  COLUMN_CODE: "WGO_AUTH_COLUMN_CODE",
  COLUMN_CERTIFICATE: "WGO_AUTH_COLUMN_CERTIFICATE",
  COLUMN_ROLES: "WGO_AUTH_COLUMN_ROLES",
  COLUMN_IS_CONFIRMED_EMAIL: "WGO_AUTH_IS_CONFIRMED_EMAIL",
  COLUMN_USER_NAME: "WGO_AUTH_COLUMN_USER_NAME",
  COLUMN_PASSWORD: "WGO_AUTH_COLUMN_PASSWORD",
  COLUMN_CONFIRM_PASSWORD: "WGO_AUTH_COLUMN_CONFIRM_PASSWORD",

  CHANGE_PASSWORD_TITLE: "WGO_AUTH_CHANGE_PASSWORD_TITLE",
  PASSWORD_EQUALS_ERR: "WGO_AUTH_PASSWORD_NEED_BE_EQUALS",
  VERIFYING_ACCOUNT_LB: "WGO_AUTH_VERIFYING_ACCOUNT_LB",

  RESEND_EMAIL_TITLE: "WGO_AUTH_RESEND_EMAIL_TITLE",
  RESET_PASSWORD_TITLE: "WGO_AUTH_RESET_PASSWORD_TITLE",
  RESET_LB: "WGO_AUTH_RESET_LB",

  EMAIL_SENDED_TITLE: "WGO_AUTH_EMAIL_SENDED_TITLE",
  SENDED_TO_LB: "WGO_AUTH_EMAIL_SENDED_TO_LB",
  CONFIRM_EMAIL_TITLE: "WGO_AUTH_CONFIRM_EMAIL_TITLE",

  CHECK_EMAIL_MSG: "WGO_AUTH_CHECK_EMAIL_MSG",

  USER_TITLE: "WGO_AUTH_USER_TITLE",

  EDIT_USER_TITLE: "WGO_AUTH_EDIT_USER_TITLE",
  EDIT_USER_SUCCESS: "WGO_AUTH_EDIT_USER_SUCCESS",
  ADD_USER_SUCCESS: "WGO_AUTH_ADD_USER_SUCCESS",
  DELETE_USER_MSG: "WGO_AUTH_DELETE_USER_MSG",
  DELETE_USER_SUCCESS: "WGO_AUTH_DELETE_USER_SUCCESS",
  USER_NAME_EXIST_ERROR_MSG: "WGO_AUTH_USER_NAME_EXIST_ERROR_MSG",
};

export const getAuthTranslationsKeys = () => {
  return Object.values(translations).concat(authServerTranslations);
};
