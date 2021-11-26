export interface IApiSettings {
  API_BASE: string;
  API_STATIC_BASE: string;
  DEFAULT_USER_PROFILE: string;
  USER_NAMESPACE: string;
  USER_LOGGED_GETTER: string;
  USER_LOGGED_ACTION: string;
}

export interface IPath {
  url: string;
  name: string;
}

export interface IObjectPaths {
  [key: string]: IPath;
}

export const CasinaPaths: IObjectPaths = {
  home: {
    url: '/',
    name: 'WGO_CASINA_MENU_HOME_LABEL'
  },
  news: {
    url: '/news',
    name: 'WGO_CASINA_MENU_NEWS_LABEL'
  },
  contact: {
    url: '/contatti',
    name: 'WGO_CASINA_MENU_CONTACT_LABEL'
  }
};

export const CasinaAdminPaths: IObjectPaths = {
  admin: {
    url: '/admin',
    name: 'WGO_CASINA_MENU_ADMIN_LABEL'
  },
  adminIndexContent: {
    url: '/admin/indexContent',
    name: 'WGO_CASINA_MENU_ADMIN_INDEX_CONT_LABEL'
  },
  adminContact: {
    url: '/admin/contact',
    name: 'WGO_CASINA_MENU_ADMIN_CONTACT_LABEL'
  },
  adminSchedule: {
    url: '/admin/schedule',
    name: 'WGO_CASINA_MENU_ADMIN_SCHEDULE_LABEL'
  },
  adminDoctors: {
    url: '/admin/doctors',
    name: 'WGO_CASINA_MENU_ADMIN_DOCTORS_LABEL'
  },
  adminServices: {
    url: '/admin/services',
    name: 'WGO_CASINA_MENU_ADMIN_SERVICES_LABEL'
  }
};

export function getPathRouter(key: string): string {
  return CasinaPaths[key].url || CasinaAdminPaths[key].url || '*';
}
