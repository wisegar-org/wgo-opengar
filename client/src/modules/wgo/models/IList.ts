import { INavigationCallBack } from './INavigation';

export interface IListSeparator {
  type: 'separator';
}

export interface IListItem {
  type: 'item';
  roleFilter?: 'isAdmin' | 'isUser';
  hideMenu?: boolean;
}

export interface IListItemNavigationCallBack
  extends IListItem,
    INavigationCallBack {}
