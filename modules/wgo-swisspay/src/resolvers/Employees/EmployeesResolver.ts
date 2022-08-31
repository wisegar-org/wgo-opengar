import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { PostgresDataSource } from '../../dataSources';
import { DataSource } from 'typeorm';
import {
  EmployeeSendDocumentsInput,
  EmployeesFilterInput,
  EmployeesInput,
  EmployeesRegisterInput,
  EmployeesTokenInput,
  UserFilterInput,
} from './EmployeesInput';
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

  @Authorized()
  @Query(() => [String])
  async getAllEmailEmployees(@Arg('data') data: UserFilterInput) {
    const employeesModel = new EmployeesService(this.dataSource);
    const employees = await employeesModel.getAllEmailsByEmployees(data.id);

    return employees as string[];
  }

  @Authorized()
  @Mutation(() => Boolean, { name: 'sendEmployeeAddLink' })
  async sendEmployeeAddLink(@Arg('data') data: EmployeesRegisterInput) {
    const employessService = new EmployeesService(this.dataSource);
    const sendEmployeeAddLink = await employessService.sendEmployeeAddLink(data);
    return sendEmployeeAddLink;
  }

  @Authorized()
  @Mutation(() => Boolean, { name: 'addEmployee' })
  async addEmployee(@Arg('data') data: EmployeesInput) {
    const employessService = new EmployeesService(this.dataSource);
    const sendEmployeeAddLink = await employessService.addEmployee(
      data.email,
      data.name,
      data.enterprise_id.id,
      data.client_id.id
    );
    return sendEmployeeAddLink;
  }

  @Authorized()
  @Mutation(() => Number, { name: 'checkEmployeeToken' })
  async checkEmployeeToken(@Arg('data') data: EmployeesTokenInput) {
    const employessService = new EmployeesService(this.dataSource);
    const sendEmployeeAddLink = await employessService.validateRegisterEmployee(data.token);
    if (sendEmployeeAddLink) {
      return parseInt(sendEmployeeAddLink.userId);
    }
    return 0;
  }

  @Authorized()
  @Mutation(() => Boolean, { name: 'deleteEmployee' })
  async deleteEmployee(@Arg('data') data: UserFilterInput) {
    const employessService = new EmployeesService(this.dataSource);
    const deleteEmployee = await employessService.deleteEmployee(data.id);

    return deleteEmployee;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendEmployeeDocuments(@Arg('data') data: EmployeeSendDocumentsInput) {
    const employessService = new EmployeesService(this.dataSource);
    const result = await employessService.sendEmployeeDocuments(data);

    return result;
  }
}
