import { ApiService } from '../../wgo-base/core/services/ApiService';
import {
  IEmployeeFilter,
  IEmployeeModel,
  IEmployeeToImportModel,
  IUserFilter,
} from '../../../../src/models/EmployeesModel';
import {
  M_EMPLOYEES_ADD,
  M_EMPLOYEES_CHECK_TOKEN,
  M_EMPLOYEES_DELETE,
  M_EMPLOYEES_REGISTER,
  M_EMPLOYEES_SEND_DOCUMENTS,
  Q_EMPLOYEES_IMPORT_FROM_FILES,
  Q_EMPLOYEES_GETALL,
  Q_EMPLOYEES_GETALL_EMAILS,
  M_EMPLOYEES_IMPORT_LIST,
} from './EmployeesServiceQueries';

export class EmployeesService {
  private apiInstance: ApiService;

  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async deleteEmployee(id: number) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_DELETE,
        fetchPolicy: 'no-cache',
        variables: {
          data: {
            id: id,
          },
        },
      })) as {
        data: { deleteEmployee: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data.deleteEmployee;
      }

      return false;
    } catch (error) {
      console.log('EmployeesService deleteEmployee error: ', error);
      return false;
    }
  }

  async checkEmployeeToken(token: string) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_CHECK_TOKEN,
        fetchPolicy: 'no-cache',
        variables: {
          data: {
            token: token,
          },
        },
      })) as {
        data: { checkEmployeeToken: number };
      };
      if (response && response.data) {
        const { data } = response;
        return data.checkEmployeeToken;
      }

      return 0;
    } catch (error) {
      console.log('EmployeesService checkEmployeeToken error: ', error);
      return 0;
    }
  }

  async addEmployee(email: string, name: string, enterprise_id: number, client_id: number) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_ADD,
        fetchPolicy: 'no-cache',
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
        data: { addEmployee: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data.addEmployee;
      }

      return false;
    } catch (error) {
      console.log('EmployeesService addEmployee error: ', error);
      return false;
    }
  }

  async sendEmployeeAddLink(email: string, enterprise_id: number) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_REGISTER,
        fetchPolicy: 'no-cache',
        variables: {
          data: {
            email: email,
            enterprise_id: {
              id: enterprise_id,
            },
          },
        },
      })) as {
        data: { sendEmployeeAddLink: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data.sendEmployeeAddLink;
      }

      return false;
    } catch (error) {
      console.log('EmployeesService sendEmployeeAddLink error: ', error);
      return false;
    }
  }

  async getAllEmployees(input: IEmployeeFilter): Promise<IEmployeeModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_EMPLOYEES_GETALL,
        fetchPolicy: 'no-cache',
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

  async sendEmployeeDocuments(client_id: number, enterprise_id: number, files: File[]) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_SEND_DOCUMENTS,
        fetchPolicy: 'no-cache',
        variables: {
          data: {
            client_id: {
              id: client_id,
            },
            enterprise_id: {
              id: enterprise_id,
            },
            files,
          },
        },
      })) as {
        data: { sendEmployeeDocuments: boolean };
      };
      if (response && response.data) {
        const { data } = response;
        return data.sendEmployeeDocuments;
      }

      return false;
    } catch (error) {
      console.log('EmployeesService sendEmployeeDocuments error: ', error);
      return false;
    }
  }

  async getEmployeesByFiles(enterprise_id: number, files: File[]) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_EMPLOYEES_IMPORT_FROM_FILES,
        fetchPolicy: 'no-cache',
        variables: {
          data: {
            enterprise_id: {
              id: enterprise_id,
            },
            files,
          },
        },
      })) as {
        data: { getEmployeesByFiles: IEmployeeToImportModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data.getEmployeesByFiles.map((item) => ({
          name: item.name,
          lastName: item.lastName,
          email: item.email,
          code: item.code,
        }));
      }

      return [];
    } catch (error) {
      console.log('EmployeesService getEmployeesByFiles error: ', error);
      return [];
    }
  }

  async importEmployeesList(enterprise_id: number, employees: IEmployeeToImportModel[]) {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_EMPLOYEES_IMPORT_LIST,
        fetchPolicy: 'no-cache',
        variables: {
          data: {
            enterprise_id: {
              id: enterprise_id,
            },
            employees,
          },
        },
      })) as {
        data: { importEmployeeList: IEmployeeModel[] };
      };
      if (response && response.data) {
        const { data } = response;
        return data.importEmployeeList;
      }

      return [];
    } catch (error) {
      console.log('EmployeesService importEmployeesList error: ', error);
      return [];
    }
  }

  async getAllEmailsEmployees(input: IUserFilter): Promise<string[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_EMPLOYEES_GETALL_EMAILS,
        fetchPolicy: 'no-cache',
        variables: {
          data: input,
        },
      })) as {
        data: { getAllEmailEmployees: string[] };
      };
      if (response && response.data) {
        const {
          data: { getAllEmailEmployees },
        } = response;
        return getAllEmailEmployees;
      }

      return [];
    } catch (error) {
      console.log('EmployeesService getAllEmailsEmployees error: ', error);
      return [];
    }
  }
}
