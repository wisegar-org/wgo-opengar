import { MenuListItem } from 'src/components/models';
import { Paths } from '../router/paths';
import { EmailMediaPaths } from '../router/paths/emailMediaPaths';
import { AdminLanguagePaths } from '../../../../wgo-base/language/router';
import { TestMenu } from './test';

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
    type: 'separator',
  },
  {
    label: AdminLanguagePaths.adminLanguage.label,
    id: AdminLanguagePaths.adminLanguage.name,
    icon: 'language',
    link: AdminLanguagePaths.adminLanguage.path,
    color: 'purple',
    type: 'item',
  },
];

export const LinksList: MenuListItem[] = listItems; //.concat(TestMenu);
