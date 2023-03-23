import { ActionTree } from 'vuex';
import { GetMediaResponseData, MediaListRow } from '../../models/models';
import { MediaService } from '../../services/MediaService';
import { GithubStateInterface } from '../state';

export const mediaActions = {
  addMediaFile: 'addMediaFile',
  deleteMediaFile: 'deleteMediaFile',
  downloadMediaFile: 'downloadMediaFile'
};

export const getGithubMediaActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async addMediaFile({}, form: unknown): Promise<MediaListRow[]> {
      const response = await MediaService.addMedia(form);
      return response;
    },
    async deleteMediaFile({}, form: unknown): Promise<boolean> {
      const response: boolean = await MediaService.deleteMedia(form);
      return response;
    },
    async downloadMediaFile(
      {},
      id: number
    ): Promise<GetMediaResponseData | undefined> {
      const response = await MediaService.downloadMedia(id);
      return response;
    }
  };

  return actions;
};
