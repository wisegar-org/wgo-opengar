import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import {
  EmailFromToAppInputGql,
  EmailInputGql,
  EmailResponseGql,
  EmailToAddressAndAppInputGql,
  EmailToAppInputGql
} from 'src/graphql';
import {
  Q_EMAIL_SENDEMAIL,
  Q_EMAIL_SENDEMAILFROMTOAPP,
  Q_EMAIL_SENDEMAILTOADDRESSANDAPP,
  Q_EMAIL_SENDEMAILTOAPP
} from '../graphql/email';

export class EmailService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async sendEmail(data: EmailInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.query({
        query: Q_EMAIL_SENDEMAIL,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { sendEmail: EmailResponseGql } };

      if (response.data && response.data.sendEmail) {
        const {
          data: { sendEmail }
        } = response;
        return sendEmail.isSuccess;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async sendEmailToApp(data: EmailToAppInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.query({
        query: Q_EMAIL_SENDEMAILTOAPP,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { sendEmailToApp: EmailResponseGql } };

      if (response.data && response.data.sendEmailToApp) {
        const {
          data: { sendEmailToApp }
        } = response;
        return sendEmailToApp.isSuccess;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async sendEmailFromToApp(
    data: EmailFromToAppInputGql
  ): Promise<boolean> {
    try {
      const response = (await this.apiService.query({
        query: Q_EMAIL_SENDEMAILFROMTOAPP,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { sendEmailFromToApp: EmailResponseGql } };

      if (response.data && response.data.sendEmailFromToApp) {
        const {
          data: { sendEmailFromToApp }
        } = response;
        return sendEmailFromToApp.isSuccess;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async sendEmailFromToAddressAndApp(
    data: EmailToAddressAndAppInputGql
  ): Promise<boolean> {
    try {
      const response = (await this.apiService.query({
        query: Q_EMAIL_SENDEMAILTOADDRESSANDAPP,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { sendEmailFromToAddressAndApp: EmailResponseGql } };

      if (response.data && response.data.sendEmailFromToAddressAndApp) {
        const {
          data: { sendEmailFromToAddressAndApp }
        } = response;
        return sendEmailFromToAddressAndApp.isSuccess;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
