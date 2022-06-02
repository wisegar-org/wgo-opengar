import { Pinia } from "pinia";
import { IApiServiceOptions } from "@wisegar-org/wgo-opengar-core-ui";
import { Environment, getSettings } from "./ApiSettings";
import { USER_AUTH_TOKEN } from "../../../../wgo-base/authenticacion/models";

import { useNotifyStore } from "src/stores/notifyStore";
const defaultEnv: Environment =
  process.env.NODE_ENV === Environment.Production
    ? Environment.Production
    : Environment.Development;

const apiSettings = getSettings(defaultEnv);

const notAuthorizedErrorHandler = (message: string) => {
  if (message != "NotAuthorized") return;
  localStorage.setItem(USER_AUTH_TOKEN, "");
};

export const getApiServiceOptions = (pinia: Pinia) => {
  const notifyStore = useNotifyStore(pinia);
  const apiServiceOptions: IApiServiceOptions = {
    onGenericErrorHandler: (message: string) => {
      console.debug(`GQL Error: ${message}`);
      notAuthorizedErrorHandler(message);
      notifyStore.setNotify({
        position: "top",
        type: "negative",
        message,
      });
    },
    onGetAuthToken: () => {
      const token = localStorage.getItem(USER_AUTH_TOKEN) || "";
      return token;
    },
    onGetBaseUrl: () => {
      return apiSettings.API_GRAPHQL;
    },
    onNetworkErrorHandler: (message) => {
      console.debug(`GQL Network Error: ${message}`);
      notifyStore.setNotify({
        position: "top",
        type: "negative",
        message,
      });
    },
    onTokenRefresh: (headers: any) => {
      if (headers) {
        const refreshedToken = headers.get("authorization-refresh");
        if (!refreshedToken || refreshedToken === null) return;
        localStorage.setItem("AUTH_TOKEN", refreshedToken);
      }
    },
    onHeadersSetup: (headers: any) => {},
  };
  return apiServiceOptions;
};
