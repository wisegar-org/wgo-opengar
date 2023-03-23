import { OrganizationDataRecord, OrganizationResponse } from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const OrganizationService = {
  async loadOrganizationData(): Promise<OrganizationDataRecord | null> {
    try {
      const response: OrganizationResponse = await settings.axios.get(
        `${ApiSettings.API_URL}organizationData`
      );
      if (response && response.data && response.data.organizationData) {
        return response.data.organizationData;
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  },
  async setOrganizationData(
    params: OrganizationDataRecord
  ): Promise<OrganizationDataRecord | null> {
    try {
      const response: OrganizationResponse = await settings.axios.post(
        `${ApiSettings.API_URL}setOrganizationData`,
        params
      );
      if (
        response &&
        response.data &&
        response.data.update &&
        response.data.organizationData
      ) {
        return response.data.organizationData;
      } else return null;
    } catch (error) {
      // console.log(error)
      return null;
    }
  }
};
