import { DataSource, Equal } from 'typeorm';
import { EmployeesEntity } from '../database/entities/EmployeesEntity';
import { IEmployeeFilter, IEmployeeModel } from '../models/EmployeesModel';

export class EmployeesService {
  dataSource: DataSource;

  /**
   *
   */
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getAllEmployees(filter: IEmployeeFilter) {
    const repo = await this.dataSource.getRepository(EmployeesEntity);
    const employeesList = await repo.find({
      where: [
        {
          enterprise_id: {
            id: filter.enterprise_id.id,
          },
        },
      ],
      relations: ['enterprise_id', 'client_id'],
    });

    return employeesList.map((employee) => this.mapEmployeeEntity(employee));
  }

  private mapEmployeeEntity(employee: EmployeesEntity): IEmployeeModel {
    console.log('TODO: EmployeesService mapEmployeeEntity employee: ', employee);
    return employee as unknown as IEmployeeModel;
  }
}
