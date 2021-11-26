import { INavigationCallBack } from './INavigation';

export interface IListSeparator {
  type: 'separator';
}

export interface IListItem {
  type: 'item';
  roleFilter?: 'isSuperAdmin' | 'isCustomer';
  hideMenu?: boolean;
}

export interface IListItemNavigationCallBack
  extends IListItem,
    INavigationCallBack {}
