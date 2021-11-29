import { MediaInputGql, MediaResponseGql, MediasInputGql } from 'src/graphql';
import { ActionTree } from 'vuex';
import { StateInterface } from 'src/store';
import { MediaStateInterface } from './state';
import { MediaService } from '../../services/MediaService';
import { ServiceProvider } from '@wisegar-org/wgo-opengar-core-ui';

const mediaService: MediaService = ServiceProvider.GetScoped(MediaService);

export const mediaActions = {
  uploadProfileImage: 'uploadProfileImage',
  uploadImage: 'uploadImage',
  uploadFiles: 'uploadFiles',
  uploadFavicon: 'uploadFavicon',
  getFile: 'getFile'
};

const actions: ActionTree<MediaStateInterface, StateInterface> = {
  async uploadProfileImage(
    {},
    arg: MediaInputGql
  ): Promise<MediaResponseGql | null> {
    const result = await mediaService.uploadFile(arg);
    return result;
  },
  async uploadImage({}, arg: MediaInputGql): Promise<MediaResponseGql | null> {
    const result = await mediaService.uploadFile(arg);
    return result;
  },
  async uploadFavicon(
    {},
    arg: MediaInputGql
  ): Promise<MediaResponseGql | null> {
    const result = await mediaService.uploadFavicon(arg);
    return result;
  },
  async uploadFiles(
    {},
    arg: MediasInputGql
  ): Promise<MediaResponseGql[] | null> {
    const result = await mediaService.uploadFiles(arg);
    return result;
  },
  async getFile({}, id: number): Promise<MediaResponseGql | null> {
    const result = await mediaService.getFile(id);
    return result;
  }
};

export default actions;
