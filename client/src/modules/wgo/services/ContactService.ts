import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import { WgoContactResponseGql, WgoContactInputGql } from 'src/graphql';
import { Q_CONTACT_DATA, M_CONTACT_DATA } from '../graphql/contact';

export class ContactService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async getContactData(module: string): Promise<WgoContactResponseGql> {
    try {
      const response = (await this.apiService.query({
        query: Q_CONTACT_DATA,
        variables: {
          module: module
        },
        fetchPolicy: 'no-cache'
      })) as { data: { getWGOContactData: WgoContactResponseGql } };

      if (response.data && response.data.getWGOContactData) {
        const {
          data: { getWGOContactData }
        } = response;
        return getWGOContactData;
      }
      return <WgoContactResponseGql>{};
    } catch (error) {
      throw `ContactService getWGOContactData: ${error as string}`;
    }
  }

  public async setContactData(data: WgoContactInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_CONTACT_DATA,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { setWGOContactData: boolean } };

      if (response.data && response.data.setWGOContactData) {
        const {
          data: { setWGOContactData }
        } = response;
        return setWGOContactData;
      }
      return false;
    } catch (error) {
      throw `ContactService setWGOContactData: ${error as string}`;
    }
  }
}
