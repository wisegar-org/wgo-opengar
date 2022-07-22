export interface IMenuItem {
  label: string;
  id: string;
  icon: string;
  link: string;
  color: string;
  type: 'item';
  role?: string[];
  auth?: boolean;
}

export interface IMenuSeparator {
  type: 'separator';
  role?: string[];
  auth?: boolean;
}

export type MenuListItem = IMenuItem | IMenuSeparator;
