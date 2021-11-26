import { IApiSettings } from '../modules/wgo/settings/ApiSettings';
import {
  ApiService,
  IApiServiceOptions
} from '@wisegar-org/wgo-opengar-core-ui';
import { LocalStorageSettings } from 'src/modules/wgo/settings/LocalStorageSettings';

export const getSettings = () => {
  const apiBase = process.env.API_BASE;

  return <IApiSettings>{
    API_BASE: apiBase + '/graphql',
    API_STATIC_BASE: apiBase + '/api/',
    DEFAULT_USER_PROFILE: 'profile/profile-user.svg',
    USER_NAMESPACE: 'userStoreModule',
    USER_LOGGED_GETTER: 'getLoggedUser',
    USER_LOGGED_ACTION: 'loadUserLogged',
    VERSION: process.env.VERSION
  };
};

export const ApiSettings: IApiSettings = getSettings();

export const apiServiceOptions: IApiServiceOptions = {
  onGenericErrorHandler: (message: string) => {
    if (message === 'NotAuthorized') localStorage.setItem('AUTH_TOKEN', '');

    console.log(`Api Response Global Error: ${message}`);
  },
  onGetAuthToken: () => {
    const token =
      localStorage.getItem(LocalStorageSettings.KEY_AUTH_TOKEN) || '';
    console.log(`Api Service: Getting Token: ${token}`);
    return token;
  },
  onGetBaseUrl: () => {
    console.log(`Api Service: Getting Base Url ${ApiSettings.API_BASE}`);
    return ApiSettings.API_BASE;
  },
  onHeadersSetup: (headers: any) => {
    //set headers
  },
  onTokenRefresh: (headers: Headers) => {
    // console.log(`Api Service: onTokenRefresh: ${headers}`);
    if (headers) {
      const refreshedToken = headers.get('AUTH_REFRESH_TOKEN');
      if (refreshedToken) {
        localStorage.setItem('AUTH_TOKEN', refreshedToken);
      }
    }
  },
  onNetworkErrorHandler: (message: string) => {
    console.log(message);
  }
};

ApiService.GetInstance(apiServiceOptions);
