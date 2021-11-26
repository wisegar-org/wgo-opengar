import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import { ContactResponseGql, ContactInputGql } from 'src/graphql';
import { Q_CONTACT_DATA, M_CONTACT_DATA } from '../graphql/contact';

export class ContactService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async getContactData(): Promise<ContactResponseGql> {
    try {
      const response = (await this.apiService.query({
        query: Q_CONTACT_DATA,
        variables: {},
        fetchPolicy: 'no-cache'
      })) as { data: { getContactData: ContactResponseGql } };

      if (response.data && response.data.getContactData) {
        const {
          data: { getContactData }
        } = response;
        return getContactData;
      }
      return <ContactResponseGql>{};
    } catch (error) {
      throw `ContactService getContactData: ${error as string}`;
    }
  }

  public async setContactData(data: ContactInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_CONTACT_DATA,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { setContactData: boolean } };

      if (response.data && response.data.setContactData) {
        const {
          data: { setContactData }
        } = response;
        return setContactData;
      }
      return false;
    } catch (error) {
      throw `ContactService setContactData: ${error as string}`;
    }
  }
}
