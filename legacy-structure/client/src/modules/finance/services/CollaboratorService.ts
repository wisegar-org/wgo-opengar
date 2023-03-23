import { CollaboratorRecord, CollaboratorsResponse } from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const CollaboratorService = {
  async editCollaboratorAccProps(params: CollaboratorRecord): Promise<boolean> {
    try {
      const response: CollaboratorsResponse = await settings.axios.post(
        `${ApiSettings.API_URL}collUpdateAccInfo`,
        params
      );
      if (response && response.data && response.data.update) {
        return true;
      } else return false;
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async addClientProvider(params: CollaboratorRecord): Promise<boolean> {
    try {
      const response: CollaboratorsResponse = await settings.axios.post(
        `${ApiSettings.API_URL}addClient`,
        params
      );
      if (response && response.data && response.data.created) {
        return true;
      } else return false;
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async getAllCollaborators(): Promise<CollaboratorRecord[]> {
    try {
      const response: CollaboratorsResponse = await settings.axios.get(
        `${ApiSettings.API_URL}collaborators`
      );
      if (response && response.data && response.data.collaborators) {
        return response.data.collaborators;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadCollaboratorStats(idCollaborator: number) {
    try {
      const response: CollaboratorsResponse = await settings.axios.get(
        `${ApiSettings.API_URL}getStats`,
        {
          params: { idCollaborator: idCollaborator }
        }
      );
      if (response && response.data && response.data.stats) {
        return response.data.stats;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  }
};
