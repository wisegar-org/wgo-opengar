import { Pinia } from "pinia";
import { IApiServiceOptions } from "@wisegar-org/wgo-base-client/build/core/services/ApiService";
import { Environment, getSettings } from "./ApiSettings";
import { translations } from "@wisegar-org/wgo-base-models/build/core/translations";

import { useNotifyStore } from "src/stores/notifyStore";
import { useAuthStore } from "src/stores/authStore";
import { useTranslationStore } from "src/stores/translationStore";
import { USER_AUTH_TOKEN } from "@wisegar-org/wgo-base-models/build/authentication/constants";
import { useLanguageStore } from "src/stores/languageStore";
const defaultEnv: Environment =
  process.env.NODE_ENV === Environment.Production
    ? Environment.Production
    : Environment.Development;

export const ApiSettingsConfig = getSettings(defaultEnv);

const isNotAuthorizedErrorHandler = (message: string) => {
  return message === "NotAuthorized";
};

const isValidateAccessTokenErrorHandelr = (message: string) => {
  return message.indexOf("validateAccessToken") !== -1;
};

export const getApiServiceOptions = (pinia: Pinia) => {
  const notifyStore = useNotifyStore(pinia);
  const authStore = useAuthStore(pinia);
  const tranStore = useTranslationStore(pinia);
  const langStore = useLanguageStore(pinia);
  const apiServiceOptions: IApiServiceOptions = {
    onGenericErrorHandler: (message: any) => {},
    onGenericErrorHandlerIndex: (message: string, index: number) => {
      console.debug(`GQL Error: ${message}`);
      if (
        isValidateAccessTokenErrorHandelr(message) ||
        isNotAuthorizedErrorHandler(message)
      ) {
        if (index === 0) authStore.authStore.setToken("");
      } else {
        notifyStore.setNotify({
          position: "top",
          type: "negative",
          message: tranStore.translationStore.getTranslation(
            message || translations.SERVER_ERROR
          ),
        });
      }
    },
    onGetAuthToken: () => {
      const token = localStorage.getItem(USER_AUTH_TOKEN) || "";
      return token;
    },
    onGetBaseUrl: () => {
      return ApiSettingsConfig.API_GRAPHQL;
    },
    onNetworkErrorHandler: (message: any) => {
      console.debug(`GQL Network Error: ${message}`);
      const messageStr =
        typeof message === "string" ? message : message.message;
      notifyStore.setNotify({
        position: "top",
        type: "negative",
        message: tranStore.translationStore.getTranslation(
          messageStr || translations.NETWORK_ERROR
        ),
      });
    },
    onTokenRefresh: (headers: any) => {
      if (headers && headers.get) {
        const refreshedToken = headers.get("authorization-refresh");
        if (!refreshedToken || refreshedToken === null) return;
        authStore.authStore.setToken(refreshedToken);
      }
    },
    onHeadersSetup: (headers: any) => {
      debugger;
      headers.language = langStore.languageStore.selectedLang.id || 0;
    },
  };
  return apiServiceOptions;
};
