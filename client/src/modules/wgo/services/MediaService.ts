import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import { ApiSettings } from 'src/boot/settings';
import { MediaInputGql, MediaResponseGql, MediasInputGql } from 'src/graphql';
import {
  M_MEDIA_UPLOADFAVICON,
  M_MEDIA_UPLOADFILE,
  M_MEDIA_UPLOADFILES,
  Q_MEDIA_GETFILE
} from '../graphql/media';

export class MediaService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async uploadFile(
    data: MediaInputGql
  ): Promise<MediaResponseGql | null> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_MEDIA_UPLOADFILE,
        variables: {
          data: data,
          urlApi: ApiSettings.API_STATIC_BASE
        },
        fetchPolicy: 'no-cache',
        context: {
          hasUpload: true
        }
      })) as { data: { saveImage: unknown } };

      if (response.data && response.data.saveImage) {
        const {
          data: { saveImage }
        } = response;
        return saveImage as MediaResponseGql;
      }
      return null;
    } catch (error) {
      throw `MediaService uploadFile: ${error as string}`;
    }
  }

  public async uploadFavicon(
    data: MediaInputGql
  ): Promise<MediaResponseGql | null> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_MEDIA_UPLOADFAVICON,
        variables: {
          data: data,
          urlApi: ApiSettings.API_STATIC_BASE
        },
        fetchPolicy: 'no-cache',
        context: {
          hasUpload: true
        }
      })) as { data: { saveFaviconFile: unknown } };

      if (response.data && response.data.saveFaviconFile) {
        const {
          data: { saveFaviconFile }
        } = response;
        return saveFaviconFile as MediaResponseGql;
      }
      return null;
    } catch (error) {
      throw `MediaService uploadFile: ${error as string}`;
    }
  }

  public async uploadFiles(
    data: MediasInputGql
  ): Promise<MediaResponseGql[] | null> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_MEDIA_UPLOADFILES,
        variables: {
          data: data,
          urlApi: ApiSettings.API_STATIC_BASE
        },
        fetchPolicy: 'no-cache',
        context: {
          hasUpload: true
        }
      })) as { data: { saveFiles: unknown } };

      if (response.data && response.data.saveFiles) {
        const {
          data: { saveFiles }
        } = response;
        return saveFiles as MediaResponseGql[];
      }
      return null;
    } catch (error) {
      throw `MediaService uploadFiles: ${error as string}`;
    }
  }

  public async getFile(id: number): Promise<MediaResponseGql | null> {
    try {
      const response = (await this.apiService.query({
        query: Q_MEDIA_GETFILE,
        variables: {
          id: id
        },
        fetchPolicy: 'no-cache'
      })) as { data: { getFile: unknown } };

      if (response.data && response.data.getFile) {
        const {
          data: { getFile }
        } = response;
        return getFile as MediaResponseGql;
      }
      return null;
    } catch (error) {
      throw `MediaService getFile: ${error as string}`;
    }
  }
}
