import { Pinia, Store } from 'pinia';
import { IApiServiceOptions } from '../../../../wgo-base/core/services/ApiService';
import { Environment, getSettings } from './ApiSettings';
import { USER_AUTH_TOKEN } from '../../../../wgo-base/authentication/models';

import { useNotifyStore } from 'src/stores/notifyStore';
import { useAuthStore } from 'src/stores/authStore';
const defaultEnv: Environment =
  process.env.NODE_ENV === Environment.Production ? Environment.Production : Environment.Development;

const apiSettings = getSettings(defaultEnv);

const isNotAuthorizedErrorHandler = (message: string) => {
  return message === 'NotAuthorized';
};

const isValidateAccessTokenErrorHandelr = (message: string) => {
  return message.indexOf('validateAccessToken') !== -1;
};

export const getApiServiceOptions = (pinia: Pinia) => {
  const notifyStore = useNotifyStore(pinia);
  const authStore = useAuthStore(pinia);
  const apiServiceOptions: IApiServiceOptions = {
    onMeErrorHandler: (message: any) => {},
    onGenericErrorHandler: (message: string, index: number) => {
      console.debug(`GQL Error: ${message}`);
      if (isValidateAccessTokenErrorHandelr(message) || isNotAuthorizedErrorHandler(message)) {
        if (index === 0) authStore.authStore.setToken('');
      } else {
        notifyStore.setNotify({
          position: 'top',
          type: 'negative',
          message: message || 'Server Error',
        });
      }
    },
    onGetAuthToken: () => {
      const token = localStorage.getItem(USER_AUTH_TOKEN) || '';
      return token;
    },
    onGetBaseUrl: () => {
      return apiSettings.API_GRAPHQL;
    },
    onNetworkErrorHandler: (message) => {
      console.debug(`GQL Network Error: ${message}`);
      notifyStore.setNotify({
        position: 'top',
        type: 'negative',
        message,
      });
    },
    onTokenRefresh: (headers: any) => {
      if (headers) {
        const refreshedToken = headers.get('authorization-refresh');
        if (!refreshedToken || refreshedToken === null) return;
        authStore.authStore.setToken(refreshedToken);
      }
    },
    onHeadersSetup: (headers: any) => {},
  };
  return apiServiceOptions;
};
