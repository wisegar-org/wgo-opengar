import { INavigationCallBack } from './INavigation';

export interface IListSeparator {
  type: 'separator';
}

export interface IListItem {
  type: 'item';
  roleFilter?: 'isAdmin' | 'isUser';
  hideMenu?: boolean;
}

export interface IListGroup {
  type: 'group';
  label: string;
  icon: string;
  items: IList[];
  status: boolean;
}

export interface IListItemNavigationCallBack
  extends IListItem,
    INavigationCallBack {
  activeRoute?: (activeRoute: string) => boolean;
}

export type IList = IListSeparator | IListGroup | IListItemNavigationCallBack;

export const isListActive = (activeRoute: string, items: IList[]) => {
  let result = false;
  items.forEach(item => {
    switch (item.type) {
      case 'group': {
        result = result || isListActive(activeRoute, item.items);
        break;
      }
      case 'item': {
        result = item.activeRoute
          ? result || item.activeRoute(activeRoute)
          : result;
      }
    }
  });
  return result;
};
