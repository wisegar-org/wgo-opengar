import {
  EmailServer,
  EmailOptions,
  GetEmailAppAddressKey,
  GetEmailAppAddressNameKey,
  GetEmailSenderKey,
  GetEmailSenderNameKey,
} from '@wisegar-org/wgo-opengar-core';
import { EmailResponseGQL } from '../modules';
import {
  EmailFromToAppInputGQL,
  EmailToAppInputGQL,
  EmailToAddressAndAppInputGQL,
} from '../modules/WGOEmail/EmailInputGQL';

export class EmailModel {
  emailServer: EmailServer;
  constructor() {
    this.emailServer = new EmailServer();
  }

  async sendEmail(data: EmailOptions): Promise<EmailResponseGQL> {
    try {
      const result = await this.emailServer.send(data);
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
      const config = this.getEmailConfi();
      const result = await this.emailServer.send({
        from: data.from,
        to: config.to,
        subject: data.subject,
        html: data.body,
        bcc: config.bcc,
        // envelope: {
        //   from: data.from,
        //   to: config.to,
        // },
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
      const config = this.getEmailConfi();
      const from = `<${GetEmailSenderKey()}> ${GetEmailSenderNameKey()}`;
      const result = await this.emailServer.send({
        from: from,
        to: config.to,
        subject: data.subject,
        html: data.body,
        bcc: config.bcc,
        // envelope: {
        //   from: from,
        //   to: config.to,
        // },
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

  async sendEmailFromToAddressAndApp(data: EmailToAddressAndAppInputGQL): Promise<EmailResponseGQL> {
    try {
      const config = this.getEmailConfi();
      const from = `<${GetEmailSenderKey()}> ${GetEmailSenderNameKey()}`;
      const result = await this.emailServer.send({
        from: from,
        to: config.to,
        subject: data.subject,
        html: data.body,
        bcc: config.bcc ? `${data.to},${config.bcc}` : data.to,
        // envelope: {
        //   from: from,
        //   to: config.to,
        // },
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

  getEmailConfi() {
    const emailAppAddressKey = GetEmailAppAddressKey().split(',');
    const emailAppAddressNameKey = GetEmailAppAddressNameKey().split(',');
    const toSend: string[] = [];
    emailAppAddressKey.forEach((email, index) => {
      if (emailAppAddressNameKey.length > index)
        toSend.push(`<${email.split(' ').join('')}> ${emailAppAddressNameKey[index]}`);
      else toSend.push(email.split(' ').join(''));
    });
    const to = toSend.splice(0, 1)[0];
    const bcc = toSend.join(',');
    return {
      to,
      bcc,
    };
  }
}
