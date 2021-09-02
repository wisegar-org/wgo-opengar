import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { DBConector } from '../../../database/DBConector';
import { AGVEnventInput } from '../modules/agvEvent/AGVEventInputs';
import { AGVEventResponse } from '../modules/agvEvent/AGVEventResponses';
import { AGVEventService } from '../services/AGVEventService';

@Resolver()
export class AGVEventResolver {
  private eventService: AGVEventService;

  /**
   *
   */
  constructor() {
    const conn = DBConector.GetConnection();
    this.eventService = new AGVEventService(conn);
  }

  @Query(() => [AGVEventResponse])
  async agvAllEvents(@Arg('urlApi') urlApi: string) {
    return await this.eventService.all(urlApi);
  }

  @Mutation(() => Boolean)
  async agvCreateEvent(@Arg('data') data: AGVEnventInput) {
    return await this.eventService.create(data);
  }

  @Mutation(() => Boolean)
  async agvModifyEvent(@Arg('data') data: AGVEnventInput) {
    return await this.eventService.modify(data);
  }
}
