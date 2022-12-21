import { RouteRecordRaw } from 'vue-router';
import { IRouteObject } from '@wisegar-org/wgo-base-models/build/core';
import { translations } from '../../components/Employees/translations';
import { CLIENT_ROLE } from '../../../../src/models/constants';

export const EmployeesPaths: IRouteObject = {
  employees: {
    path: '/employees',
    label: translations.TITLE,
    name: 'employees',
    auth: true,
    role: [CLIENT_ROLE],
  },
  registerEmployees: {
    path: '/employees/registerEmployee',
    label: translations.ADD_EMPLOYEE_LABEL,
    name: 'add_employee',
    auth: false,
  },
  confirmEmployee: {
    path: '/employees/confirmEmployee',
    label: translations.CONFIRM_EMPLOYEE_LABEL,
    name: 'add_employee',
    auth: true,
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
        auth: EmployeesPaths.employees.auth,
      },
    },
    {
      path: EmployeesPaths.confirmEmployee.path,
      component: () => import('pages/Employees/AddEmployeePage.vue'),
      meta: {
        auth: EmployeesPaths.confirmEmployee.auth,
      },
    },
    {
      path: EmployeesPaths.registerEmployees.path,
      component: () => import('pages/Employees/RegisterEmployeePage.vue'),
      meta: {
        auth: EmployeesPaths.registerEmployees.auth,
      },
    },
  ],
};
