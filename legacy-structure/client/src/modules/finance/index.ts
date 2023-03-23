export * from './store';
export * from './store/state';
export * from './settings';
export * from './router';
export * from './models/models';
export * from './models/parsers';

export const FINANCE_MODULE_NAME = 'finance';

import { GithubPaths } from './router';
import { WGO_MODULE } from '../wgo';

export const FINANCE_MODULE = [
  {
    icon: 'attach_money',

    text: 'WGO_FINANCE_MODULE_DESCRIPTION',
    title: 'WGO_FINANCE_MODULE_TITLE',
    path: GithubPaths.homePage.url
  }
].concat(WGO_MODULE);
