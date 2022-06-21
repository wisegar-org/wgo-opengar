import { ApiService } from '../../../../../wgo-base/core/services/ApiService';
import { IEmailMediaModel, IEmailMediaFilter, IEmailModel } from '../../../../src/models/EmailModel';
import { Q_EMAILMEDIA_GETALL, Q_EMAILMEDIA_GETEMAIL } from './EmailMediaServiceQueries';
import { IIdInput } from '../../../../src/models';

export class EmailMediaService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getAllEmailMedia(input: IEmailMediaFilter): Promise<IEmailMediaModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_EMAILMEDIA_GETALL,
        variables: {
          data: input,
        },
      })) as {
        data: { getAllEmailMedia: IEmailMediaModel[] };
      };
      if (response && response.data) {
        const {
          data: { getAllEmailMedia },
        } = response;
        return getAllEmailMedia;
      }

      return [];
    } catch (error) {
      console.log('EmailMediaService getAllEmailMedia error: ', error);
      return [];
    }
  }

  async getEmailById(input: IIdInput) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_EMAILMEDIA_GETEMAIL,
        variables: {
          data: input,
        },
      })) as {
        data: { getEmail: IEmailModel };
      };
      if (response && response.data) {
        const {
          data: { getEmail },
        } = response;
        return getEmail;
      }

      return null;
    } catch (error) {
      console.log('EmailMediaService getEmailById error: ', error);
      return null;
    }
  }
}
