import { IndexAdminRoute } from './../../wgo/settings/RouterSettings';
import { getWGOAdminRoutes } from '../../wgo/settings/RouterSettings';
import {
  BreadCrumbsItems,
  getWGONavigations
} from '../../wgo/settings/BreadCrumbSettings';
import { RouteConfig } from 'vue-router';

export interface IPath {
  url: string;
  name: string;
}

export const GithubPaths = {
  homePage: {
    url: '/',
    name: 'WGO_FINANCE_HOME_MENU_LABEL'
  },
  adminIndexPage: {
    url: '/admin/indexPage',
    name: 'WGO_FINANCE_INDEX_PAGE_MENU_LABEL'
  },
  adminContactPage: {
    url: '/admin/contactPage',
    name: 'WGO_FINANCE_CONTACT_PAGE_MENU_LABEL'
  },
  adminModulePage: {
    url: '/admin/modulesPage',
    name: 'WGO_FINANCE_MODULES_PAGE_MENU_LABEL'
  },
  homePageFinance: {
    url: '/finance',
    name: 'WGO_FINANCE_FINANCE_MENU_LABEL'
  },
  issuesTablePage: {
    url: '/finance/issues'
  },
  accountingTabelPage: {
    url: '/finance/accounting'
  },
  accountingTemplatePage: {
    url: '/finance/accounting/template'
  },
  collaboratorsTablePage: {
    url: '/finance/collaborators'
  },
  transactionsTablePage: {
    url: '/finance/transactions'
  },
  incomesTablePage: {
    url: '/finance/incomes'
  },
  expensesTablePage: {
    url: '/finance/expenses'
  },
  organizationPage: {
    url: '/finance/organization'
  },
  productsPage: {
    url: '/finance/products'
  },
  billsPage: {
    url: '/finance/bills'
  },
  billTemplatePage: {
    url: '/finance/bills/template'
  }
};

export const HomeBC = {
  to: GithubPaths.homePage.url,
  icon: 'home',
  label: 'Home'
};

export const IndexContent = {
  to: GithubPaths.adminIndexPage.url,
  icon: 'other_houses',
  label: 'Index'
};

export const Contact = {
  to: GithubPaths.adminContactPage.url,
  icon: 'contact_page',
  label: 'Contact'
};

export const Modules = {
  to: GithubPaths.adminModulePage.url,
  icon: 'view_module',
  label: 'Modules'
};

export const IssuesBC = {
  to: GithubPaths.issuesTablePage.url,
  icon: 'bug_report',
  label: 'WGO_FINANCE_ISSUES_TITLE_BC'
};
export const AccountingBC = {
  to: GithubPaths.accountingTabelPage.url,
  icon: 'account_balance',
  label: 'Accounting'
};
export const AccountingTemplateBC = {
  to: GithubPaths.accountingTemplatePage.url,
  icon: 'settings',
  label: 'Accounting Template',
  hideMenu: true,
  roleFilter: 'isSuperAdmin'
};
export const CollaboratorBC = {
  to: GithubPaths.collaboratorsTablePage.url,
  icon: 'contacts',
  label: 'WGO_FINANCE_COLLABORATOR_TITLE_BC'
};
export const TransactionBC = {
  to: GithubPaths.transactionsTablePage.url,
  icon: 'account_balance_wallet',
  label: 'Transactions'
};
export const IncomesBC = {
  to: GithubPaths.incomesTablePage.url,
  icon: 'credit_card',
  label: 'Incomes',
  roleFilter: 'isSuperAdmin'
};
export const ExpensesBC = {
  to: GithubPaths.expensesTablePage.url,
  icon: 'local_atm',
  label: 'Expenses',
  roleFilter: 'isSuperAdmin'
};
export const ProductsBC = {
  to: GithubPaths.productsPage.url,
  icon: 'shop',
  label: 'Products',
  roleFilter: 'isSuperAdmin'
};
export const BillsBC = {
  to: GithubPaths.billsPage.url,
  icon: 'import_contacts',
  label: 'Bills',
  roleFilter: 'isSuperAdmin'
};
export const BillTemplateBC = {
  to: GithubPaths.billTemplatePage.url,
  icon: 'settings',
  label: 'Bill Template',
  hideMenu: true,
  roleFilter: 'isSuperAdmin'
};
export const BreadCrumbsGithub: {
  to: string;
  icon: string;
  label: string;
  roleFilter?: 'isSuperAdmin' | 'isCustomer';
  hideMenu?: boolean;
}[] = [
  HomeBC,
  IssuesBC,
  AccountingBC,
  AccountingTemplateBC,
  CollaboratorBC,
  ProductsBC,
  BillsBC,
  BillTemplateBC,
  TransactionBC,
  IncomesBC,
  ExpensesBC,
  {
    to: GithubPaths.organizationPage.url,
    icon: 'location_city',
    label: 'Organization',
    roleFilter: 'isSuperAdmin'
  }
];

export const IssueRoutes: RouteConfig[] = [
  {
    path: GithubPaths.homePage.url,
    component: () => import('../pages/FinanceHomePage.vue'),
    meta: { requiresAuth: true, loginReturn: true }
  },
  {
    path: GithubPaths.issuesTablePage.url,
    component: () => import('../pages/IssuesPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.accountingTabelPage.url,
    component: () => import('../pages/AccountingsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.accountingTemplatePage.url,
    component: () =>
      import(
        '../components/Accounting/AccountingTemplate/AccountingTemplatePage.vue'
      ),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.collaboratorsTablePage.url,
    component: () => import('../pages/CollaboratorsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.transactionsTablePage.url,
    component: () => import('../pages/TransactionsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.incomesTablePage.url,
    component: () => import('../pages/IncomesPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.expensesTablePage.url,
    component: () => import('../pages/ExpensesPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.organizationPage.url,
    component: () => import('../pages/OrganizationPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.productsPage.url,
    component: () => import('../pages/ProductsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.billsPage.url,
    component: () => import('../pages/BillsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: GithubPaths.billTemplatePage.url,
    component: () =>
      import('../components/Bills/BillTemplate/BillTemplatePage.vue'),
    meta: { requiresAuth: true }
  }
];

const wgoAdminRoutes = getWGOAdminRoutes();
export const AdminRedirect: RouteConfig = {
  path: '/admin',
  redirect: wgoAdminRoutes.WGO_UsersAdminRoute.path
};

export const AdminIndexPageRoute: RouteConfig = {
  path: GithubPaths.adminIndexPage.url,
  component: () => import('../pages/admin/AdminIndexPage.vue'),
  meta: { requiresAuth: true }
};

export const AdminContactPageRoute: RouteConfig = {
  path: GithubPaths.adminContactPage.url,
  component: () => import('../pages/admin/AdminContactPage.vue'),
  meta: { requiresAuth: true }
};

export const AdminModulesPageRoute: RouteConfig = {
  path: GithubPaths.adminModulePage.url,
  component: () => import('../pages/admin/AdminModulesPage.vue'),
  meta: { requiresAuth: true }
};

export const FinanceLayout: RouteConfig[] = [
  {
    path: '/',
    component: () => import('../../finance/layouts/EmptyLayout.vue'),
    props: () => {
      const breadCrumbs = BreadCrumbsGithub;
      return {
        itemsPaths: breadCrumbs
      };
    },
    children: [
      {
        path: GithubPaths.homePage.url,
        component: () => import('../pages/Index.vue'),
        meta: { requiresAuth: false }
      }
    ],
    meta: { requiresAuth: false }
  },
  {
    path: '/finance',
    component: () => import('../../wgo/layouts/MainLayout.vue'),
    props: () => {
      const breadCrumbs = BreadCrumbsGithub;
      return {
        itemsPaths: breadCrumbs
      };
      /*
    const breadCrumbs: {
      BreadCrumbsGithub: IBreadCrumbItem;
    } = require('./router.ts');
    return {
      itemsPaths: breadCrumbs.BreadCrumbsGithub
    };
    */
    },
    children: IssueRoutes,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: () => import('../../wgo/layouts/MainLayout.vue'),
    props: () => {
      const breadCrumbs = getWGONavigations();
      return {
        itemsPaths: [
          HomeBC,
          IndexContent,
          Modules,
          Contact,
          breadCrumbs.WGO_UsersNavigation,
          breadCrumbs.WGO_LanguageNavigation,
          breadCrumbs.WGO_TranslationsNavigation,
          breadCrumbs.WGO_SeoNavigation
        ],
        showEditProfile: false
      };
      /*
    const breadCrumbs: {
      BreadCrumbsGithub: IBreadCrumbItem;
    } = require('./router.ts');
    return {
      itemsPaths: breadCrumbs.BreadCrumbsGithub
    };
    */
    },
    children: [
      AdminRedirect,
      AdminIndexPageRoute,
      AdminModulesPageRoute,
      AdminContactPageRoute,
      wgoAdminRoutes.WGO_UsersAdminRoute,
      wgoAdminRoutes.WGO_LanguageAdminRoute,
      wgoAdminRoutes.WGO_TranslationAdminRoute,
      wgoAdminRoutes.WGO_SeoAdminRoute
    ]
  }
];
