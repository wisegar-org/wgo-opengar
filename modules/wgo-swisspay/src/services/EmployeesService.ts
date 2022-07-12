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
      where: [{ enterprise_id: Equal(filter.enterprise_id) }],
      relations: ['enterprise_id'],
    });

    return employeesList.map((employee) => this.mapEmployeeEntity(employee));
  }

  private mapEmployeeEntity(employee: EmployeesEntity, employeeId: number = 0): IEmployeeModel {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      enterprise_id: employee.enterprise_id,
      client_id: employee.client_id,
    } as IEmployeeModel;
  }
}
