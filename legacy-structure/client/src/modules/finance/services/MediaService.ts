import {
  GetMediaResponseData,
  MediaListRow,
  MediaResponse,
  MediaResponseData
} from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const MediaService = {
  async addMedia(params: any): Promise<MediaListRow[]> {
    try {
      const response: MediaResponse<MediaResponseData> = await settings.axios.post(
        `${ApiSettings.API_URL}addMedia`,
        params,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      const {
        data: { created, items }
      } = response;
      return created && items ? items : [];
    } catch (error) {
      // console.log(error);
      return [];
    }
  },
  async deleteMedia(form: any): Promise<boolean> {
    try {
      const response: MediaResponse<MediaResponseData> = await settings.axios.post(
        `${ApiSettings.API_URL}deleteMedia`,
        form
      );
      const {
        data: { deleted }
      } = response;
      return !!deleted;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  async downloadMedia(id: number): Promise<GetMediaResponseData | undefined> {
    try {
      const response: MediaResponse<GetMediaResponseData> = await settings.axios.get(
        `${ApiSettings.API_URL}downloadMedia`,
        {
          params: { id }
        }
      );
      const { data } = response;
      return data;
    } catch (error) {
      // console.log(error);
      return;
    }
  }
};
