import { RouteLocationRaw, RouteParamsRaw, RouteRecordRaw } from 'vue-router';
import { Paths } from '../paths';
import { IRouteObject } from '../../../../../wgo-base/core/models';
import { translations } from '../../components/Employees/translations';

export const EmployeesPaths: IRouteObject = {
  employees: {
    path: '/employees',
    label: translations.TITLE,
    name: 'employees',
  },
};

export const EmployeesPathRouter: RouteRecordRaw = {
  path: EmployeesPaths.employees.path,
  name: EmployeesPaths.employees.name,
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: EmployeesPaths.employees.path,
      component: () => import('pages/Employees/EmployeesListPage.vue'),
      meta: {
        auth: true,
      },
    },
  ],
};
