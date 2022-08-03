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

export interface IMenuGroup {
  type: 'group';
  role?: string[];
  auth?: boolean;
  label: string;
  icon: string;
  status: boolean;
  items: MenuListItem[];
}

export interface IMenuSeparator {
  type: 'separator';
  role?: string[];
  auth?: boolean;
}

export type MenuListItem = IMenuItem | IMenuSeparator | IMenuGroup;
