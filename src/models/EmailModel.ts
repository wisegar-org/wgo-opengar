import { EmailServer, GetNodeEnvKey } from '@wisegar-org/wgo-opengar-core';
import { EmailInputGQL } from '../graphql/types/inputs/EmailInputGQL';
import { EmailResponseGQL } from '../graphql/types/responses/EmailResponseGQL';

export class EmailModel {
  emailServer: EmailServer;
  env: string;
  isProduction: boolean;
  constructor() {
    this.emailServer = new EmailServer();
    this.env = GetNodeEnvKey();
    this.isProduction = this.env === 'production';
  }

  async sendEmail(data: EmailInputGQL): Promise<EmailResponseGQL> {
    try {
      const result = await this.emailServer.send({
        from: data.from,
        to: this.isProduction ? data.to : '<info@wisegar.org> Test Email Address',
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
