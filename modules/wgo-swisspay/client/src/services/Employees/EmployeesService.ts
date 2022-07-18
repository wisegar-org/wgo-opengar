import { ApiService } from 'app/../../wgo-base/core/services/ApiService';
import { IEmployeeFilter, IEmployeeModel } from '../../../../src/models/EmployeesModel';
import { Q_EMPLOYEES_GETALL } from './EmployeesServiceQueries';

export class EmployeesService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getAllEmployees(input: IEmployeeFilter): Promise<IEmployeeModel[]> {
    try {
      console.log('EmployeesService getAllEmployees input: ', input);
      const response = (await this.apiInstance.query({
        query: Q_EMPLOYEES_GETALL,
        variables: {
          data: input,
        },
      })) as {
        data: { getAllEmployees: IEmployeeModel[] };
      };
      console.log('EmployeesService getAllEmployees response: ', response);
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
