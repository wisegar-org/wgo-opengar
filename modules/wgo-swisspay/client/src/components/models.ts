export interface IMenuItem {
  label: string;
  id: string;
  icon: string;
  link: string;
  color: string;
  type: 'item';
}

export interface IMenuSeparator {
  type: 'separator';
}

export type MenuListItem = IMenuItem | IMenuSeparator;
