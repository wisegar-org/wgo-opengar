import { IIdInput } from '../../../../../wgo-base/core/models';
import { ApiService } from '../../../../../wgo-base/core/services/ApiService';
import {
  IEmailMediaModel,
  IEmailMediaFilter,
  IEmailModel,
  IEmailDetailsModel,
} from '../../../../src/models/EmailModel';
import { Q_EMAILMEDIA_GETALL, Q_EMAILMEDIA_GETEMAIL, Q_EMAILMEDIA_GETEMAILMEDIA } from './EmailMediaServiceQueries';

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

  async getEmailMediaById(input: IIdInput) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_EMAILMEDIA_GETEMAILMEDIA,
        variables: {
          data: input,
        },
      })) as {
        data: { getEmailMedia: IEmailDetailsModel };
      };
      if (response && response.data) {
        const {
          data: { getEmailMedia },
        } = response;
        return getEmailMedia;
      }

      return null;
    } catch (error) {
      console.log('EmailMediaService getEmailMediaById error: ', error);
      return null;
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
