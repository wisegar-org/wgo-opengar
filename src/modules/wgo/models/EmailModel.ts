import {
  EmailServer,
  GetEmailAppAddressKey,
  GetEmailAppAddressNameKey,
  GetEmailSenderKey,
  GetEmailSenderNameKey,
} from '@wisegar-org/wgo-opengar-core';
import { EmailResponseGQL } from '../modules';
import { EmailFromToAppInputGQL, EmailInputGQL, EmailToAppInputGQL } from '../modules/WGOEmail/EmailInputGQL';

export class EmailModel {
  emailServer: EmailServer;
  constructor() {
    this.emailServer = new EmailServer();
  }

  async sendEmail(data: EmailInputGQL): Promise<EmailResponseGQL> {
    try {
      const result = await this.emailServer.send({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.body,
      });
      return <EmailResponseGQL>result;
    } catch (error) {
      return <EmailResponseGQL>{
        isSuccess: false,
        message: 'Error',
        error: error,
      };
    }
  }

  async sendEmailToApp(data: EmailToAppInputGQL): Promise<EmailResponseGQL> {
    try {
      const emailAppAddressKey = GetEmailAppAddressKey().split(',');
      const emailAppAddressNameKey = GetEmailAppAddressNameKey().split(',');
      const toSend: string[] = [];
      emailAppAddressKey.forEach((email, index) => {
        if (emailAppAddressNameKey.length > index)
          toSend.push(`<${email.split(' ').join('')}> ${emailAppAddressNameKey[index]}`);
        else toSend.push(email.split(' ').join(''));
      });
      const result = await this.emailServer.send({
        from: data.from,
        to: toSend.join(','),
        subject: data.subject,
        html: data.body,
      });
      return <EmailResponseGQL>result;
    } catch (error) {
      return <EmailResponseGQL>{
        isSuccess: false,
        message: 'Error',
        error: error,
      };
    }
  }

  async sendEmailFromToApp(data: EmailFromToAppInputGQL): Promise<EmailResponseGQL> {
    try {
      const emailAppAddressKey = GetEmailAppAddressKey().split(',');
      const emailAppAddressNameKey = GetEmailAppAddressNameKey().split(',');
      const toSend: string[] = [];
      emailAppAddressKey.forEach((email, index) => {
        if (emailAppAddressNameKey.length > index)
          toSend.push(`<${email.split(' ').join('')}> ${emailAppAddressNameKey[index]}`);
        else toSend.push(email.split(' ').join(''));
      });
      const result = await this.emailServer.send({
        from: `<${GetEmailSenderKey()}> ${GetEmailSenderNameKey()}`,
        to: toSend.join(', '),
        subject: data.subject,
        html: data.body,
      });
      return <EmailResponseGQL>result;
    } catch (error) {
      return <EmailResponseGQL>{
        isSuccess: false,
        message: 'Error',
        error: error,
      };
    }
  }
}
