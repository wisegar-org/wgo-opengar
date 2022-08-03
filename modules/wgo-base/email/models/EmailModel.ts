import { EmailServer, EmailOptions } from "@wisegar-org/wgo-mailer";
import {
  GetEmailAppAddressKey,
  GetEmailAppAddressNameKey,
  GetEmailSenderKey,
  GetEmailSenderNameKey,
} from "@wisegar-org/wgo-settings";
import { DataSource } from "typeorm";
import { IContextBase } from "../../core/models/context";
import { SmtpSettings } from "../../settings/models";
import { SETTINGS_SMTP } from "../../settings/models/constants";
import { SettingsModel } from "../../settings/models/SettingsModel";
import {
  EmailFromToAppInput,
  EmailToAddressAndAppInput,
  EmailToAppInput,
} from "../resolvers/EmailInputs";
import { EmailResponse } from "../resolvers/EmailResponses";

export class EmailModel {
  emailServer: EmailServer;
  dataSource: DataSource;
  ctx: IContextBase;

  constructor(ctx: IContextBase) {
    this.ctx = ctx;
    this.emailServer = new EmailServer();
    this.dataSource = ctx.dataSource;
  }

  async sendEmail(data: EmailOptions): Promise<EmailResponse> {
    try {
      const settingsModel = new SettingsModel(this.ctx);
      const configSmtp = (await settingsModel.getSettingsObject({
        type_settings: SETTINGS_SMTP,
      })) as any as SmtpSettings;
      const result = await this.emailServer.sendByConfig(data, configSmtp);
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  async sendEmailToApp(data: EmailToAppInput): Promise<EmailResponse> {
    try {
      const settingsModel = new SettingsModel(this.ctx);
      const configSmtp = (await settingsModel.getSettingsObject({
        type_settings: SETTINGS_SMTP,
      })) as any as SmtpSettings;
      const config = this.getEmailConfi();
      const result = await this.emailServer.sendByConfig(
        {
          from: data.from,
          to: config.to,
          subject: data.subject,
          html: data.body,
          bcc: config.bcc,
          // envelope: {
          //   from: data.from,
          //   to: config.to,
          // },
        },
        configSmtp
      );
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  async sendEmailFromToApp(data: EmailFromToAppInput): Promise<EmailResponse> {
    try {
      const settingsModel = new SettingsModel(this.ctx);
      const configSmtp = (await settingsModel.getSettingsObject({
        type_settings: SETTINGS_SMTP,
      })) as any as SmtpSettings;
      const config = this.getEmailConfi();
      const from = `<${GetEmailSenderKey()}> ${GetEmailSenderNameKey()}`;
      const result = await this.emailServer.sendByConfig(
        {
          from: from,
          to: config.to,
          subject: data.subject,
          html: data.body,
          bcc: config.bcc,
          // envelope: {
          //   from: from,
          //   to: config.to,
          // },
        },
        configSmtp
      );
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  async sendEmailFromToAddressAndApp(
    data: EmailToAddressAndAppInput
  ): Promise<EmailResponse> {
    try {
      const settingsModel = new SettingsModel(this.ctx);
      const configSmtp = (await settingsModel.getSettingsObject({
        type_settings: SETTINGS_SMTP,
      })) as any as SmtpSettings;
      const config = this.getEmailConfi();
      const from = `<${GetEmailSenderKey()}> ${GetEmailSenderNameKey()}`;
      const result = await this.emailServer.sendByConfig(
        {
          from: from,
          to: config.to,
          subject: data.subject,
          html: data.body,
          bcc: config.bcc ? `${data.to},${config.bcc}` : data.to,
          // envelope: {
          //   from: from,
          //   to: config.to,
          // },
        },
        configSmtp
      );
      return <EmailResponse>result;
    } catch (error) {
      return <EmailResponse>{
        isSuccess: false,
        message: "Error",
        error: error,
      };
    }
  }

  getEmailConfi() {
    const emailAppAddressKey = GetEmailAppAddressKey().split(",");
    const emailAppAddressNameKey = GetEmailAppAddressNameKey().split(",");
    const toSend: string[] = [];
    emailAppAddressKey.forEach((email, index) => {
      if (emailAppAddressNameKey.length > index)
        toSend.push(
          `<${email.split(" ").join("")}> ${emailAppAddressNameKey[index]}`
        );
      else toSend.push(email.split(" ").join(""));
    });
    const to = toSend.splice(0, 1)[0];
    const bcc = toSend.join(",");
    return {
      to,
      bcc,
    };
  }
}
