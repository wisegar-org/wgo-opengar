import { RouteConfig } from 'vue-router';
import {
  GithubPaths,
  FINANCE_MODULE_NAME,
  FinanceLayout,
  FINANCE_MODULE
} from '../modules/finance';
import { AGV_MODULE_NAME, AGVPaths, AGV_MODULE } from 'src/modules/agv';
import { AGVLayout } from 'src/modules/agv/settings/RouterSettings';

import { WGO_MODULE_NAME, WGOPaths, WGO_MODULE } from 'src/modules/wgo';
import {
  WGOLayout,
  routesEmptyLayout
} from 'src/modules/wgo/settings/RouterSettings';
import { OpengarPaths } from 'src/modules/wgo/settings/ApiSettings';
import {
  CasinaLayout,
  CasinaPaths,
  CASINA_MODULE,
  CASINA_MODULE_NAME
} from 'src/modules/casina';
import { PrintPaths } from 'src/modules/print/settings/ApiSettings';
import { PrintLayout, PRINT_MODULE, PRINT_MODULE_NAME } from 'src/modules/print';

const modules = (process.env.MODULES || 'wgo').split(',')[0];

export const parseRedirectHome = (modules: string) => {
  if (modules.startsWith(FINANCE_MODULE_NAME)) return GithubPaths.homePage.url;
  if (modules.startsWith(AGV_MODULE_NAME)) return AGVPaths.home.url;
  if (modules.startsWith(CASINA_MODULE_NAME)) return CasinaPaths.home.url;
  if (modules.startsWith(PRINT_MODULE_NAME)) return PrintPaths.home.url;

  if (modules.startsWith(WGO_MODULE_NAME)) return WGOPaths.home.url;

  return undefined;
};

export const moduleInConfig = (modules: string, module: string) => {
  return modules.indexOf(module) !== -1;
};

export const getModules = (modules: string) => {
  if (moduleInConfig(modules, FINANCE_MODULE_NAME)) return FINANCE_MODULE;
  if (moduleInConfig(modules, AGV_MODULE_NAME)) return AGV_MODULE;
  if (moduleInConfig(modules, WGO_MODULE_NAME)) return WGO_MODULE;
  if (moduleInConfig(modules, CASINA_MODULE_NAME)) return CASINA_MODULE;
  if (moduleInConfig(modules, PRINT_MODULE_NAME)) return PRINT_MODULE;
};

const homeLayout = {
  path: OpengarPaths.home.url,
  component: () => import('../modules/wgo/layouts/MainLayout.vue'),
  props: () => {
    let modulesList: {
      icon: string;
      text: string;
      title: string;
      path: string;
    }[] = [];
    const mod = getModules(modules);
    if (mod) modulesList = modulesList.concat(mod);
    return {
      itemsPaths: modulesList.map(item => ({
        to: item.path,
        icon: item.icon,
        label: item.title,
        hideBC: true
      }))
    };
  },
  children: [
    {
      path: OpengarPaths.home.url,
      component: () => import('../pages/Index.vue'),
      meta: { requiresAuth: true, loginReturn: true }
    }
  ]
};

export const routesItems: RouteConfig[] = [routesEmptyLayout]
  .concat(moduleInConfig(modules, FINANCE_MODULE_NAME) ? FinanceLayout : [])
  .concat(moduleInConfig(modules, AGV_MODULE_NAME) ? AGVLayout : [])
  .concat(moduleInConfig(modules, WGO_MODULE_NAME) ? WGOLayout : [])
  .concat(moduleInConfig(modules, CASINA_MODULE_NAME) ? CasinaLayout : [])
  .concat(moduleInConfig(modules, PRINT_MODULE_NAME) ? PrintLayout : [])
  .concat([
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
  ]);