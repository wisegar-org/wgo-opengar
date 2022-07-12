import { RouteLocationRaw, RouteParamsRaw, RouteRecordRaw } from 'vue-router';
import { Paths } from '../paths';
import { IRouteObject } from '../../../../../wgo-base/core/models';

export const EmployeesPaths: IRouteObject = {
  employees: {
    path: '/employees',
    label: 'Employees',
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
