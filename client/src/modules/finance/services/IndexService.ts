import { ApiSettings } from '../settings/ApiSettings';
import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import { MediaResponseGql, FinanceIndexContentInputsGql } from 'src/graphql';
import { M_FINANCE_ADMIN_SETINDEXCONTENT, Q_FINANCE_ADMIN_LOADINDEXCONTENT } from '../graphql/indexModel';

export class IndexService {
    apiInstance: ApiService;
    constructor() {
        this.apiInstance = ApiService.GetInstance();
    }
    async loadIndexContent() {
        try {
          const response = (await this.apiInstance.query({
            query: Q_FINANCE_ADMIN_LOADINDEXCONTENT,
            variables: {
              urlApi: ApiSettings.API_URL
            },
            fetchPolicy: 'no-cache'
          })) as { data: { getFinanceIndexContent: { image: MediaResponseGql } } };
          if (response && response.data && response.data) {
            const {
              data: { getFinanceIndexContent }
            } = response;
    
            return getFinanceIndexContent;
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    
      async setIndexContent(data: FinanceIndexContentInputsGql) {
        try {
          const response = (await this.apiInstance.mutate({
            mutation: M_FINANCE_ADMIN_SETINDEXCONTENT,
            variables: {
                data: data
            },
            fetchPolicy: 'no-cache'
          })) as { data: { setFinanceIndexContent: boolean } };
          if (response && response.data && response.data) {
            const {
              data: { setFinanceIndexContent }
            } = response;
    
            return !!setFinanceIndexContent;
          }
          return false;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
};
