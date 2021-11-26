export interface IItemIcon {
  label: string;
  icon: string;
}

export interface INavigationCallBack extends IItemIcon {
  onClick: () => unknown;
}

export interface IPropNavigation {
  label: string;
  property: string;
}
export interface INavigationTo extends IItemIcon {
  to: string;
  props?: IPropNavigation[];
}

export interface INotify {
  message: string;
  type: 'positive' | 'negative';
}
