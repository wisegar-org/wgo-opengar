import { Paths } from '../router/paths';
import { EmailMediaPaths } from '../router/paths/emailMediaPaths';

export const LinksList = [
  {
    title: Paths.home.label,
    caption: 'Home paga',
    icon: 'home',
    link: Paths.home.path,
  },
  {
    title: EmailMediaPaths.emailMedia.label,
    caption: 'Email media info',
    icon: 'email',
    link: EmailMediaPaths.emailMedia.path,
  },
];
