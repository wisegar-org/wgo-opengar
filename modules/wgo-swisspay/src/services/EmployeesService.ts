import { EmailServer } from '@wisegar-org/wgo-mailer';
import { generateAccessToken, validateAccessToken } from '@wisegar-org/wgo-server';
import {
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from '@wisegar-org/wgo-settings';
import { DataSource, Equal } from 'typeorm';
import { EmployeesEntity } from '../database/entities/EmployeesEntity';
import { IEmployeeFilter, IEmployeeModel, IEmployeeOptions, IRegisterEmployeeFilter } from '../models/EmployeesModel';

export class EmployeesService {
  dataSource: DataSource;
  emailService: EmailServer;
  options: IEmployeeOptions;

  /**
   *
   */
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.emailService = new EmailServer();
    this.options = {
      privateKey: GetPrivateKey(),
      publicKey: GetPublicKey(),
      hostBase: GetHostBaseKey(),
      tokenExpiresIn: GetExpiresInKey(),
      tokenRegisterExpiresIn: '24h',
      emailOptions: { from: GetEmailAppAddressKey() } as any,
    };
  }

  async validateRegisterEmployee(token: string) {
    const validatedToken = validateAccessToken({
      publicKey: this.options.publicKey,
      token: token,
    });

    return validatedToken;
  }

  async addEmployee(email: string, name: string, enterprise_id: number, client_id: number) {
    const repo = await this.dataSource.getRepository(EmployeesEntity);

    const exist_employee = await repo.find({
      where: [
        {
          enterprise_id: {
            id: enterprise_id,
          },
          email: email,
        },
      ],
      relations: ['enterprise_id', 'client_id'],
    });

    if (exist_employee) {
      console.log('Invalid Data: Employee exist!');
      return false;
    }

    const employee = await repo.insert({
      name: name,
      email: email,
      enterprise_id: {
        id: enterprise_id,
      },
      client_id: {
        id: client_id,
      },
    });

    console.log(employee);

    return true;
  }

  async registerEmployee(employee: IRegisterEmployeeFilter) {
    console.log('TODO: EmployeesService registerEmployee employee: ', employee);
    const token = generateAccessToken({
      privateKey: this.options.privateKey,
      expiresIn: this.options.tokenRegisterExpiresIn,
      payload: {
        userId: employee.enterprise_id.id.toString(),
        userName: employee.email,
        sessionId: -1,
      },
    });
    await this.emailService.send({
      ...this.options.emailOptions,
      subject: 'Wisegar - Register Employee',
      to: `${employee.email}`,
      html: `<div>
        <p>
          To register as an employee, please click on the link below:
        </p>
        <a href="${this.options.hostBase}employees/addEmployee?token=${token}">
          ${this.options.hostBase}employees/addEmployee?token=${token}
        </a>
        </div>`,
    });

    return true;
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
