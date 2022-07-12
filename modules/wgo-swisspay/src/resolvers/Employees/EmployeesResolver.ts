import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { PostgresDataSource } from '../../../dataSources';
import { DataSource } from 'typeorm';
import { EmployeesFilterInput } from './EmployeesInput';
import { EmployeesResponse } from './EmployeesResponse';
import { EmployeesService } from '../../services/EmployeesService';

@Resolver()
export class EmployeesResolver {
  private dataSource: DataSource;

  /**
   *
   */
  constructor() {
    this.dataSource = PostgresDataSource;
  }

  @Authorized()
  @Query(() => [EmployeesResponse])
  async getAllEmployees(@Arg('data') data: EmployeesFilterInput) {
    const employeesModel = new EmployeesService(this.dataSource);
    const employees = await employeesModel.getAllEmployees(data);
    return employees as EmployeesResponse[];
  }
}
