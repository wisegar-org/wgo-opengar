import { EmailServer } from '@wisegar-org/wgo-mailer';
import { generateAccessToken, validateAccessToken } from '@wisegar-org/wgo-server';
import {
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from '@wisegar-org/wgo-settings';
import PdfParse from 'pdf-parse';
import { DataSource } from 'typeorm';
import { UserRolesModel } from '../wgo-base/authentication/models/UserRolesModel';
import { UserUtils } from '../wgo-base/authentication/models/UserUtils';
import { UtilService } from '../wgo-base/core/services/UtilService';
import { EmployeesEntity } from '../database/entities/EmployeesEntity';
import {
  IEmployeeDocumentProps,
  IEmployeeFilter,
  IEmployeeModel,
  IEmployeeOptions,
  IEmployeeToImportModel,
  IRegisterEmployeeFilter,
} from '../models/EmployeesModel';
import {
  EmployeeSendDocumentsInput,
  GetEmployeesByFileInput,
  ImportEmployeesInput,
} from '../resolvers/Employees/EmployeesInput';
import { EmailMediaService } from './EmailMediaService';
import PDFService from './PDFService';
import { SettingsModel } from '../wgo-base/settings/models/SettingsModel';
import { SETTINGS_SMTP } from '../wgo-base/settings/models/constants';
import { SmtpSettings } from '../wgo-base/settings/models';
import { ctx } from '../handlers/AppContextHandler';
import { readEmployeesFromFile } from './UtilsServices';
import { UserEntity } from '../wgo-base/authentication/database/entities/UserEntity';
import { AuthModel } from '../wgo-base/authentication/models/AuthModel';
import { CLIENT_ROLE, USER_ROLE } from '../models/constants';

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

  async deleteEmployee(id: number) {
    const repo = await this.dataSource.getRepository(EmployeesEntity);
    const deletedEmployee = await repo.delete({
      id: id,
    });

    return deletedEmployee.affected && deletedEmployee.affected > 0;
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
      relations: ['enterprise_id', 'client_id', 'client_id.roles'],
    });

    if (exist_employee.length > 0) {
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

  async sendEmployeeAddLink(employee: IRegisterEmployeeFilter) {
    console.log('EmployeesService sendEmployeeAddLink employee: ', employee);
    const token = generateAccessToken({
      privateKey: this.options.privateKey,
      expiresIn: this.options.tokenRegisterExpiresIn,
      payload: {
        userId: employee.enterprise_id.id.toString(),
        userName: employee.code,
        sessionId: -1,
      },
    });
    const user = await this.getUserEntityByCriteria({ code: employee.code });
    if (user) {
      const link = `${this.options.hostBase}/#/employees/confirmEmployee?token=${token}`;
      console.debug(link);
      const settingsModel = new SettingsModel(ctx);
      const config = (await settingsModel.getSettingsObject({ type_settings: SETTINGS_SMTP })) as any as SmtpSettings;
      const transportEmailOptions = {
        host: config.SMTP_EMAIL_HOST,
        port: config.SMTP_EMAIL_PORT,
        auth: {
          user: config.SMTP_EMAIL_USER,
          pass: settingsModel.getSettingPasswordValue(config.SMTP_EMAIL_PASSWORD),
        },
      };
      try {
        await this.emailService.sendByConfig(
          {
            ...this.options.emailOptions,
            subject: 'Wisegar - Register Employee',
            to: `${user.email}`,
            html: `<div>
          <p>
            To register as an employee, please click on the link below:
          </p>
          <a href="${link}">
            Click here
          </a>
          </div>`,
          },
          transportEmailOptions
        );
      } catch (err: any) {
        console.log(err.message);
      }

      return user;
    }
    // const link = `${this.options.hostBase}/#/employees/${
    //   userExists ? 'confirmEmployee' : 'registerEmployee'
    // }?token=${token}`;
    // console.debug(link);

    return user;
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
      relations: ['enterprise_id', 'client_id', 'client_id.roles'],
    });

    return employeesList.map((employee) => this.mapEmployeeEntity(employee));
  }

  async sendEmployeeDocuments(data: EmployeeSendDocumentsInput) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      ctx,
      transportEmailOptions: {},
    });
    const emailMediaService = new EmailMediaService(this.dataSource);
    const docResult: IEmployeeDocumentProps[] = [];
    const user = await userRolesModel.getUser(data.client_id.id);
    const client = await userRolesModel.getUser(data.enterprise_id.id);
    if (!user || !client) return false;
    for (const file of data.files) {
      const result = await emailMediaService.addMediaByEmail(file, user as any, client as any);
      docResult.push(result);
    }

    let emailInfo = '';
    docResult.forEach(
      (doc) =>
        (emailInfo += `<p><li>Document: ${doc.fileName}   ${UtilService.roundNumber(doc.size / 1024, 2)}kb</li></p>`)
    );

    const settingsModel = new SettingsModel(ctx);
    const config = (await settingsModel.getSettingsObject({ type_settings: SETTINGS_SMTP })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: settingsModel.getSettingPasswordValue(config.SMTP_EMAIL_PASSWORD),
      },
    };
    await this.emailService.sendByConfig(
      {
        ...this.options.emailOptions,
        subject: `Wisegar - Send Employee Documents`,
        to: `${user.email}`,
        html: `<div>
        <p>
          Company ${client.name} ${client.lastName} has sent new documents:
        </p>
        ${emailInfo}
        </div>`,
      },
      transportEmailOptions
    );

    return true;
  }

  async getEmployeesByFiles(data: GetEmployeesByFileInput) {
    let employees: IEmployeeToImportModel[] = [];

    for (const file of data.files) {
      employees = employees.concat(await readEmployeesFromFile(file));
    }

    return employees;
  }

  async importEmployeeList(data: ImportEmployeesInput) {
    const arg = {
      ...this.options,
      ctx,
      transportEmailOptions: {},
    };
    const pendigEmployeesLink: IEmployeeModel[] = [];
    const result = await this.dataSource.transaction(async () => {
      const userRolesModel = new UserRolesModel(arg);
      const authModel = new AuthModel(arg);
      const employeeRepo = this.dataSource.getRepository(EmployeesEntity);

      const enterprise = await userRolesModel.getEntityByCriteria({ id: data.enterprise_id.id });
      if (!enterprise) {
        return [];
      }

      const employeList: EmployeesEntity[] = [];
      for (const employee of data.employees) {
        const employeeEntity = await userRolesModel.getEntityByCriteria({
          code: employee.code,
        });
        if (
          employeeEntity &&
          (await employeeRepo.findOne({
            where: {
              client_id: {
                id: employeeEntity.id,
              },
              enterprise_id: {
                id: enterprise.id,
              },
            },
          }))
        ) {
          pendigEmployeesLink.push(
            this.mapEmployeeEntity({
              client_id: employeeEntity,
              enterprise_id: enterprise,
              email: employee.email,
              name: employee.name,
              id: 0,
            } as EmployeesEntity)
          );
        } else {
          let user = await this.sendEmployeeAddLink({ code: employee.code, enterprise_id: data.enterprise_id });
          if (!!user) {
            pendigEmployeesLink.push(
              this.mapEmployeeEntity(
                {
                  client_id: user,
                  enterprise_id: enterprise,
                  email: employee.email,
                  id: 0,
                  name: `${user.name}`,
                } as EmployeesEntity,
                false
              )
            );
          } else {
            const userRegiterd = await authModel.register({
              name: employee.name,
              lastName: employee.lastName,
              code: employee.code,
              email: employee.email,
              userName: employee.email,
              isEmailConfirmed: false,
              certificate: '',
              password: '',
              roles: [USER_ROLE],
              id: 0,
            });
            const criteria = userRegiterd.code ? { code: userRegiterd.code } : { id: userRegiterd.id };
            user = await userRolesModel.getEntityByCriteria(criteria);
            if (!user) throw 'Error on insert user';

            const findEmployee = await employeeRepo.findOne({
              where: {
                client_id: {
                  id: user.id,
                },
                enterprise_id: {
                  id: enterprise.id,
                },
              },
            });

            if (!findEmployee) {
              const employeeEntity = new EmployeesEntity();
              employeeEntity.enterprise_id = enterprise;
              employeeEntity.email = employee.email;
              employeeEntity.client_id = user;
              employeeEntity.name = user.userName;

              employeList.push(employeeEntity);
            }
          }
        }
      }

      const result = await employeeRepo.save(employeList);
      return result;
    });

    return pendigEmployeesLink.concat(result.map((item) => this.mapEmployeeEntity(item)));
  }

  async getAllEmailsByEmployees(idEmployee: number) {
    const repo = await this.dataSource.getRepository(EmployeesEntity);

    const employees = await repo.find({
      where: [
        {
          client_id: {
            id: idEmployee,
          },
        },
      ],
    });

    return employees.map((employee) => employee.email);
  }

  private async getUserEntityByCriteria(criteria: any) {
    const userRepo = new UserRolesModel({ ...this.options, ctx, transportEmailOptions: {} });
    const user = await userRepo.getEntityByCriteria(criteria);
    return user;
  }

  private async validateUserExistByCriteria(criteria: any) {
    return !!this.getUserEntityByCriteria(criteria);
  }

  private mapEmployeeEntity(employee: EmployeesEntity, confirmed: boolean = true): IEmployeeModel {
    console.log('EmployeesService mapEmployeeEntity employee: ', employee);
    return {
      id: employee.id,
      email: employee.email,
      name: employee.name,
      client: UserUtils.mapUserEntity(employee.client_id),
      enterprise: UserUtils.mapUserEntity(employee.enterprise_id),
      confirmed: confirmed,
    };
  }
}
