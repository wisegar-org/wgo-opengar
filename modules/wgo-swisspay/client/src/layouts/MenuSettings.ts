import { MenuListItem } from 'src/components/models';
import { Paths } from '../router/paths';
import { EmailMediaPaths } from '../router/paths/emailMediaPaths';
import { AdminLanguagePaths } from '../../../../wgo-base/language/router';
import { TestMenu } from './test';
import { AdminTranslationPaths } from 'app/../../wgo-base/translation/router';
import { AdminSettingsPaths } from 'app/../../wgo-base/settings/router';
import { EmployeesPaths } from 'src/router/paths/employeesPaths';
import { AuthPaths } from 'app/../../wgo-base/authentication/router';

const listItems: MenuListItem[] = [
  {
    label: Paths.home.label,
    id: Paths.home.name,
    icon: 'home',
    link: Paths.home.path,
    color: 'blue',
    type: 'item',
  },
  {
    label: EmailMediaPaths.emailMedia.label,
    id: EmailMediaPaths.emailMedia.name,
    icon: 'email',
    link: EmailMediaPaths.emailMedia.path,
    color: 'green',
    type: 'item',
  },
  {
    label: EmployeesPaths.employees.label,
    id: EmployeesPaths.employees.name,
    icon: 'person',
    link: EmployeesPaths.employees.path,
    color: 'red',
    type: 'item',
  },
  {
    type: 'separator',
  },
  {
    label: AuthPaths.authUsers.label,
    id: AuthPaths.authUsers.name,
    icon: 'people',
    link: AuthPaths.authUsers.path,
    color: 'orange',
    type: 'item',
  },
  {
    label: AdminLanguagePaths.adminLanguage.label,
    id: AdminLanguagePaths.adminLanguage.name,
    icon: 'language',
    link: AdminLanguagePaths.adminLanguage.path,
    color: 'purple',
    type: 'item',
  },
  {
    label: AdminTranslationPaths.adminTranslation.label,
    id: AdminTranslationPaths.adminTranslation.name,
    icon: 'translate',
    link: AdminTranslationPaths.adminTranslation.path,
    color: 'brown',
    type: 'item',
  },
  {
    label: AdminSettingsPaths.adminSettings.label,
    id: AdminSettingsPaths.adminSettings.name,
    icon: 'settings',
    link: AdminSettingsPaths.adminSettings.path,
    color: 'deep-orange-7',
    type: 'item',
  },
];

export const LinksList: MenuListItem[] = listItems; //.concat(TestMenu);
