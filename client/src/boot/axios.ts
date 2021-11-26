import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { boot } from 'quasar/wrappers';
import { LocalStorageSettings } from 'src/modules/wgo/settings/LocalStorageSettings';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export const axiosInst = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
});

axiosInst.interceptors.request.use((config: AxiosRequestConfig) => {
  const headers = config.headers as { [key: string]: string };
  headers['authorization'] = `Bearer ${localStorage.getItem(
    LocalStorageSettings.KEY_AUTH_TOKEN
  ) || ''}`;
  config.headers = headers;
  return config;
});

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axiosInst;
});
