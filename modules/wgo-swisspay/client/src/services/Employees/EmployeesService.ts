import { ApiService } from 'app/../../wgo-base/core/services/ApiService';
import { IEmployeeFilter, IEmployeeModel } from '../../../../src/models/EmployeesModel';
import {
  M_EMPLOYEES_ADD,
  M_EMPLOYEES_CHECK_TOKEN,
  M_EMPLOYEES_REGISTER,
  Q_EMPLOYEES_GETALL,
} from './EmployeesServiceQueries';

export class EmployeesService {
  private apiInstance: ApiService;

  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async checkEmployeeToken(token: string) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_CHECK_TOKEN,
        variables: {
          data: {
            token: token,
          },
        },
      })) as {
        data: { ['checkEmployeeToken']: number };
      };
      if (response && response.data) {
        const { data } = response;
        return data['checkEmployeeToken'];
      }

      return 0;
    } catch (error) {
      console.log('EmployeesService addEmployee error: ', error);
      return 0;
    }
  }

  async addEmployee(email: string, name: string, enterprise_id: number, client_id: number) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_ADD,
        variables: {
          data: {
            email: email,
            name: name,
            enterprise_id: {
              id: enterprise_id,
            },
            client_id: {
              id: client_id,
            },
          },
        },
      })) as {
        data: { ['addEmployee']: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data['addEmployee'];
      }

      return false;
    } catch (error) {
      console.log('EmployeesService addEmployee error: ', error);
      return false;
    }
  }

  async registerEmployee(email: string, enterprise_id: number) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_REGISTER,
        variables: {
          data: {
            email: email,
            enterprise_id: {
              id: enterprise_id,
            },
          },
        },
      })) as {
        data: { ['registerEmployee']: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data['registerEmployee'];
      }

      return false;
    } catch (error) {
      console.log('EmployeesService registerEmployee error: ', error);
      return false;
    }
  }

  async getAllEmployees(input: IEmployeeFilter): Promise<IEmployeeModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_EMPLOYEES_GETALL,
        variables: {
          data: input,
        },
      })) as {
        data: { getAllEmployees: IEmployeeModel[] };
      };
      if (response && response.data) {
        const {
          data: { getAllEmployees },
        } = response;
        return getAllEmployees;
      }

      return [];
    } catch (error) {
      console.log('EmployeesService getAllEmployees error: ', error);
      return [];
    }
  }
}
