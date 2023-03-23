export interface IApiSettings {
  API_BASE: string;
  API_STATIC_BASE: string;
  DEFAULT_USER_PROFILE: string;
  USER_NAMESPACE: string;
  USER_LOGGED_GETTER: string;
  USER_LOGGED_ACTION: string;
  APP_LANGUAGE: string;
  USER_LANGUAGE: string;
  VERSION: string;
}
export interface IPath {
  url: string;
  name?: string;
}

export interface IObjectPaths {
  [key: string]: IPath;
}

export const OpengarPaths: IObjectPaths = {
  home: {
    url: '/opengar'
  },
  auth: {
    url: '/opengar/auth'
  },
  login: {
    url: '/opengar/auth/login'
  },
  register: {
    url: '/opengar/auth/register'
  },
  checkEmailConfirmation: {
    url: '/opengar/auth/checkEmailConfirmation/:token'
  },
  resendEmailConfirmation: {
    url: '/opengar/auth/resendEmailConfirmation'
  },
  sentedEmailConfirmation: {
    url: '/opengar/auth/sentedEmailConfirmation'
  }
};

export const getWGOPaths = (module = '') => {
  return {
    home: {
      url: `${module}/admin`,
      name: 'WGO_ADMIN_TITLE_BC'
    },
    users: {
      url: `${module}/admin/users`,
      name: 'WGO_USERS_ADMIN_TITLE_BC'
    },
    languages: {
      url: `${module}/admin/languages`,
      name: 'WGO_LANGUAGE_ADMIN_TITLE_BC'
    },
    translations: {
      url: `${module}/admin/translations`,
      name: 'WGO_TRANSLATIONS_ADMIN_TITLE_BC'
    },
    seo: {
      url: `${module}/admin/seo`,
      name: 'WGO_SEO_ADMIN_TITLE_BC'
    }
  };
};

export const WGOPaths: IObjectPaths = getWGOPaths();

export function getPathRouter(key: string): string {
  return WGOPaths[key].url || '*';
}
