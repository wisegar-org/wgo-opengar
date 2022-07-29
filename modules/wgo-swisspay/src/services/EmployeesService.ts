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
  IRegisterEmployeeFilter,
} from '../models/EmployeesModel';
import { EmployeeSendDocumentsInput } from '../resolvers/Employees/EmployeesInput';
import { EmailMediaService } from './EmailMediaService';
import PDFService from './PDFService';
import { SettingsModel } from '../wgo-base/settings/models/SettingsModel';
import { SETTINGS_SMTP } from '../wgo-base/settings/models/constants';
import { SmtpSettings } from '../wgo-base/settings/models';

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
        userName: employee.email,
        sessionId: -1,
      },
    });
    const userExists = await this.vaidateUserExist(employee.email);
    const link = `${this.options.hostBase}/#/employees/${
      userExists ? 'confirmEmployee' : 'registerEmployee'
    }?token=${token}`;
    console.debug(link);

    const settingsModel = new SettingsModel(this.dataSource);
    const config = (await settingsModel.getSettingsObject({ type_settings: SETTINGS_SMTP })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: config.SMTP_EMAIL_PASSWORD,
      },
    };
    await this.emailService.sendByConfig(
      {
        ...this.options.emailOptions,
        subject: 'Wisegar - Register Employee',
        to: `${employee.email}`,
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
      relations: ['enterprise_id', 'client_id', 'client_id.roles'],
    });

    return employeesList.map((employee) => this.mapEmployeeEntity(employee));
  }

  async sendEmployeeDocuments(data: EmployeeSendDocumentsInput) {
    const userRolesModel = new UserRolesModel({
      ...this.options,
      dataSource: this.dataSource,
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

    const settingsModel = new SettingsModel(this.dataSource);
    const config = (await settingsModel.getSettingsObject({ type_settings: SETTINGS_SMTP })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: config.SMTP_EMAIL_PASSWORD,
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

  private async vaidateUserExist(email: string) {
    const settingsModel = new SettingsModel(this.dataSource);
    const config = (await settingsModel.getSettingsObject({ type_settings: SETTINGS_SMTP })) as any as SmtpSettings;
    const transportEmailOptions = {
      host: config.SMTP_EMAIL_HOST,
      port: config.SMTP_EMAIL_PORT,
      auth: {
        user: config.SMTP_EMAIL_USER,
        pass: config.SMTP_EMAIL_PASSWORD,
      },
    };
    const userRepo = new UserRolesModel({ ...this.options, dataSource: this.dataSource, transportEmailOptions });
    const user = await userRepo.getUserByEmail(email);
    return !!user;
  }

  private mapEmployeeEntity(employee: EmployeesEntity): IEmployeeModel {
    console.log('EmployeesService mapEmployeeEntity employee: ', employee);
    return {
      id: employee.id,
      email: employee.email,
      name: employee.name,
      client: UserUtils.mapUserEntity(employee.client_id),
      enterprise: UserUtils.mapUserEntity(employee.enterprise_id),
    };
  }
}
