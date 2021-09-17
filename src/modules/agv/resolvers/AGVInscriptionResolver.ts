import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { DBConector } from '../../../database/DBConector';
import { AGVEventInput } from '../modules/agvEvent/AGVEventInputs';
import { AGVInscriptionInput } from '../modules/agvInscription/AGVInscriptionInputs';
import { AGVInscriptionResponse } from '../modules/agvInscription/AGVInscriptionResponses';
import { AGVInscriptionService } from '../services/AGVInscriptionService';

@Resolver()
export class AGVInscriptionResolver {
  private inscriptionService: AGVInscriptionService;

  /**
   *
   */
  constructor() {
    const conn = DBConector.GetConnection();
    this.inscriptionService = new AGVInscriptionService(conn);
  }

  @Query(() => [AGVInscriptionResponse])
  async agvAllInscriptions() {
    return await this.inscriptionService.all();
  }

  @Mutation(() => Boolean)
  async agvCreateInscription(@Arg('data') data: AGVInscriptionInput) {
    return await this.inscriptionService.create(data);
  }

  @Mutation(() => Boolean)
  async agvModifyInscription(@Arg('data') data: AGVEventInput) {
    // return await this.inscriptionService.modify(data);
  }
}
