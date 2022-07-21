import { RouteRecordRaw } from 'vue-router';
import { IRouteObject } from '../../../../../wgo-base/core/models';
import { translations } from '../../components/Employees/translations';

export const EmployeesPaths: IRouteObject = {
  employees: {
    path: '/employees',
    label: translations.TITLE,
    name: 'employees',
  },
  registerEmployees: {
    path: '/employees/registerEmployee',
    label: translations.ADD_EMPLOYEE_LABEL,
    name: 'add_employee',
  },
  confirmEmployee: {
    path: '/employees/confirmEmployee',
    label: translations.CONFIRM_EMPLOYEE_LABEL,
    name: 'add_employee',
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
    {
      path: EmployeesPaths.confirmEmployee.path,
      component: () => import('pages/Employees/AddEmployeePage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: EmployeesPaths.registerEmployees.path,
      component: () => import('pages/Employees/RegisterEmployeePage.vue'),
      meta: {
        auth: true,
      },
    },
  ],
};
