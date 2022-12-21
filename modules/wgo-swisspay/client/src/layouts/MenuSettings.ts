import { MenuListItem } from '@wisegar-org/wgo-base-models/build/core/Menu';
import { AdminLanguagePaths } from '@wisegar-org/wgo-base-models/build/language';
import { AdminTranslationPaths } from '@wisegar-org/wgo-base-models/build/translation';
import { AdminSettingsPaths } from '@wisegar-org/wgo-base-models/build/settings';
import { AuthPaths } from '@wisegar-org/wgo-base-models/build/authentication';
import { Paths } from '../router/paths';
import { EmailMediaPaths } from '../router/paths/emailMediaPaths';
import { TestMenu } from './test';
import { EmployeesPaths } from 'src/router/paths/employeesPaths';

const listItems: MenuListItem[] = [
  {
    label: Paths.home.label,
    id: Paths.home.name,
    icon: 'home',
    link: Paths.home.path,
    role: Paths.home.role,
    auth: Paths.home.auth,
    color: 'blue',
    type: 'item',
  },
  {
    label: EmailMediaPaths.emailMedia.label,
    id: EmailMediaPaths.emailMedia.name,
    icon: 'email',
    link: EmailMediaPaths.emailMedia.path,
    role: EmailMediaPaths.emailMedia.role,
    auth: EmailMediaPaths.emailMedia.auth,
    color: 'green',
    type: 'item',
  },
  {
    label: EmployeesPaths.employees.label,
    id: EmployeesPaths.employees.name,
    icon: 'person',
    link: EmployeesPaths.employees.path,
    role: EmployeesPaths.employees.role,
    auth: EmployeesPaths.employees.auth,
    color: 'red',
    type: 'item',
  },
  {
    type: 'separator',
    role: AuthPaths.authUsers.role,
  },
  {
    label: AuthPaths.authUsers.label,
    id: AuthPaths.authUsers.name,
    icon: 'people',
    link: AuthPaths.authUsers.path,
    role: AuthPaths.authUsers.role,
    auth: AuthPaths.authUsers.auth,
    color: 'orange',
    type: 'item',
  },
  {
    label: AdminLanguagePaths.adminLanguage.label,
    id: AdminLanguagePaths.adminLanguage.name,
    icon: 'language',
    link: AdminLanguagePaths.adminLanguage.path,
    role: AdminLanguagePaths.adminLanguage.role,
    auth: AdminLanguagePaths.adminLanguage.auth,
    color: 'purple',
    type: 'item',
  },
  {
    label: AdminTranslationPaths.adminTranslation.label,
    id: AdminTranslationPaths.adminTranslation.name,
    icon: 'translate',
    link: AdminTranslationPaths.adminTranslation.path,
    role: AdminTranslationPaths.adminTranslation.role,
    auth: AdminTranslationPaths.adminTranslation.auth,
    color: 'brown',
    type: 'item',
  },
  {
    label: AdminSettingsPaths.adminSettings.label,
    id: AdminSettingsPaths.adminSettings.name,
    icon: 'settings',
    link: AdminSettingsPaths.adminSettings.path,
    role: AdminSettingsPaths.adminSettings.role,
    auth: AdminSettingsPaths.adminSettings.auth,
    color: 'deep-orange-7',
    type: 'item',
  },
];

export const LinksList: MenuListItem[] = listItems; //.concat(TestMenu);
