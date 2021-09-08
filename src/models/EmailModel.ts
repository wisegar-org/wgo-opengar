import {
  EmailServer,
  GetEmailAppAddressKey,
  GetEmailAppAddressNameKey,
  GetEmailSenderKey,
  GetEmailSenderNameKey,
} from '@wisegar-org/wgo-opengar-core';
import { EmailFromToAppInputGQL, EmailInputGQL, EmailToAppInputGQL } from '../graphql/types/inputs/EmailInputGQL';
import { EmailResponseGQL } from '../graphql/types/responses/EmailResponseGQL';

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
      const result = await this.emailServer.send({
        from: data.from,
        to: `<${GetEmailAppAddressKey()}> ${GetEmailAppAddressNameKey()}`,
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
      const result = await this.emailServer.send({
        from: `<${GetEmailSenderKey()}> ${GetEmailSenderNameKey()}`,
        to: `<${GetEmailAppAddressKey()}> ${GetEmailAppAddressNameKey()}`,
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
