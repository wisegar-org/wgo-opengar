import { SUPERADMIN } from '../../authentication/models';
import { IRouteObject, translations } from '../models';

export const AdminBasePath = '/admin';

export const AdminPaths: IRouteObject = {
  admin: {
    path: `${AdminBasePath}`,
    name: 'admin',
    label: translations.APP_ADMIN_TITLE,
    auth: true,
    role: [SUPERADMIN],
  },
};
