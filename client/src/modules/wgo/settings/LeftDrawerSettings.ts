import { IListItemNavigationCallBack, IListSeparator } from '../models';
import { IBreadCrumbItem } from '../models/IBreadCrumbItem';
import { RouteService } from '../services';

export function getDrawerItems(
  routeService: RouteService,
  items: IBreadCrumbItem[]
) {
  const drawerGithub: IListItemNavigationCallBack[] = items
    .filter(item => !item.hideMenu)
    .map(pathGithub => {
      return <IListItemNavigationCallBack>{
        type: 'item',
        label: pathGithub.label,
        onClick: () => {
          routeService.goTo(pathGithub.to);
        },
        icon: pathGithub.icon,
        roleFilter: pathGithub.roleFilter,
        activeRoute: (activeRoute: string) =>
          routeService.isActiveRoute(activeRoute, pathGithub.to)
      };
    });
  const drawerItem: (
    | IListItemNavigationCallBack
    | IListSeparator
  )[] = drawerGithub;

  return drawerItem;
}
