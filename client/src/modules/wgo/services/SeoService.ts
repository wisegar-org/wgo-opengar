import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import { ApiSettings } from 'src/boot/settings';
import { SeoResponseGql, SeoInputGql } from 'src/graphql';
import { Q_SEO_GETMETADATA, M_SEO_SETMETADATA } from '../graphql/seo';

export class SeoService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = ApiService.GetInstance();
  }

  public async getSeoData(): Promise<SeoResponseGql> {
    try {
      const response = (await this.apiService.query({
        query: Q_SEO_GETMETADATA,
        variables: {
          urlApi: ApiSettings.API_STATIC_BASE
        },
        fetchPolicy: 'no-cache'
      })) as { data: { getSeoData: SeoResponseGql } };

      if (response.data && response.data.getSeoData) {
        const {
          data: { getSeoData }
        } = response;
        return getSeoData;
      }
      return <SeoResponseGql>{};
    } catch (error) {
      throw `SeoService getSeoData: ${error as string}`;
    }
  }

  public async setSeoData(data: SeoInputGql): Promise<boolean> {
    try {
      const response = (await this.apiService.mutate({
        mutation: M_SEO_SETMETADATA,
        variables: {
          data: data
        },
        fetchPolicy: 'no-cache'
      })) as { data: { setSeoData: boolean } };

      if (response.data && response.data.setSeoData) {
        const {
          data: { setSeoData }
        } = response;
        return setSeoData;
      }
      return false;
    } catch (error) {
      throw `SeoService setSeoData: ${error as string}`;
    }
  }
}
