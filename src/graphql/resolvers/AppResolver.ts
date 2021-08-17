import { Query, Resolver } from 'type-graphql';
import { ApiService } from '../../services/ApiService';

@Resolver()
export class AppResolver {
  private ApiService: ApiService;
  /**
   *
   */
  constructor() {
    this.ApiService = new ApiService();
  }
  @Query(() => String)
  async serverVersion() {
    return this.ApiService.getApiVersion();
  }
}
