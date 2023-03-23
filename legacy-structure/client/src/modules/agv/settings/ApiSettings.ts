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

export const AGVPaths: IObjectPaths = {
  home: {
    url: '/',
    name: 'Home'
  },
  comitato: {
    url: '/comitato',
    name: 'Comitato'
  },
  corsi: {
    url: '/corsi',
    name: 'Corsi'
  },
  eventi: {
    url: '/eventi',
    name: 'Eventi'
  },
  links: {
    url: '/links',
    name: 'Link Utili'
  },
  contatto: {
    url: '/contatto',
    name: 'Contatto'
  }
};

export const AGVDetailsPaths: IObjectPaths = {
  corsiDetails: {
    url: '/corsi/details',
    name: 'Corsi'
  },
  eventiDetails: {
    url: '/eventi/details',
    name: 'Eventi'
  }
};

export const AGVAdminPaths: IObjectPaths = {
  admin: {
    url: '/admin',
    name: 'Amministrare'
  },
  adminEvents: {
    url: '/admin/events',
    name: 'Amministrare Eventi'
  },
  adminInscriptions: {
    url: '/admin/inscriptions',
    name: 'Amministrare Iscrizioni'
  }
};

export function getPathRouter(key: string): string {
  return AGVPaths[key].url || '*';
}
