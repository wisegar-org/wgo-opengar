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

export const PrintPaths: IObjectPaths = {
  home: {
    url: '/',
    name: 'WGO_PRINT_MENU_HOME_LABEL'
  },
};

export const PrintAdminPaths: IObjectPaths = {
  admin: {
    url: '/admin',
    name: 'WGO_PRINT_MENU_ADMIN_LABEL'
  },
};

export function getPathRouter(key: string): string {
  return PrintPaths[key].url || PrintAdminPaths[key].url || '*';
}
