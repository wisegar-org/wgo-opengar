import { getSettings } from 'src/boot/settings';
import { axiosInst } from './AxiosSettings';

const settigns = getSettings();

export const ApiSettings = {
  API_URL: settigns.API_STATIC_BASE,
  USER_LOGGED_ACTION: settigns.USER_LOGGED_ACTION,
  USER_LOGGED_GETTER: settigns.USER_LOGGED_GETTER,
  USER_NAMESPACE: settigns.USER_NAMESPACE
};

export interface SettingsGithub {
  API_STATIC_BASE: string;
  USER_NAMESPACE: string;
  USER_LOGGED_ACTION: string;
  USER_LOGGED_GETTER: string;
}

const settings = {
  axios: axiosInst,
  settings: ApiSettings
};

export default settings;
