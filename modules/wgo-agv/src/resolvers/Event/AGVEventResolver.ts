import { Arg, Mutation, Query, Resolver, Authorized, Ctx } from "type-graphql";
import AGVEventEntity from "../../database/entities/AGVEventEntity";
import { AGVEventModel } from "../../models/Event/EventModel";
import { SUPERADMIN } from "../../wgo-base/models/authentication";
import { IContextBase } from "../../wgo-base/models/core/context";
import { HistoricModel } from "../../wgo-base/server/historic/models/HistoricModel";
import { HistoricResponse } from "../../wgo-base/server/historic/resolvers/HistoricResponses";
import { AGVEventInput, AGVEventPageInput } from "./AGVEventInputs";
import {
  AGVEventGetNextsResponse,
  AGVEventGetPageResponse,
  AGVEventResponse,
} from "./AGVEventResponses";

@Resolver()
export class AGVEventResolver {
  @Query(() => [AGVEventResponse])
  async agvAllEvents(@Arg("urlApi") urlApi: string, @Ctx() ctx: IContextBase) {
    const eventModel = new AGVEventModel(ctx);
    return await eventModel.all(urlApi);
  }

  @Query(() => AGVEventGetPageResponse)
  async agvAllEventsByPage(
    @Arg("data") data: AGVEventPageInput,
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    const eventModel = new AGVEventModel(ctx);
    return await eventModel.getPage(data, urlApi);
  }

  @Query(() => [String])
  async agvGetAllClassEvents(
    @Arg("type") type: string,
    @Ctx() ctx: IContextBase
  ) {
    const eventModel = new AGVEventModel(ctx);
    return await eventModel.getAllClass(type);
  }

  @Query(() => AGVEventResponse)
  async agvGetEvent(
    @Arg("id") id: number,
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    const eventModel = new AGVEventModel(ctx);
    return await eventModel.getEvent(id, urlApi, true);
  }

  @Query(() => AGVEventGetNextsResponse)
  async agvGetNextEvents(
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    const eventModel = new AGVEventModel(ctx);
    return await eventModel.getNexts(urlApi);
  }

  @Authorized(SUPERADMIN)
  @Mutation(() => Boolean)
  async agvCreateEvent(
    @Arg("data") data: AGVEventInput,
    @Ctx() ctx: IContextBase
  ) {
    const eventModel = new AGVEventModel(ctx);
    return await eventModel.create(data);
  }

  @Authorized(SUPERADMIN)
  @Mutation(() => Boolean)
  async agvModifyEvent(
    @Arg("data") data: AGVEventInput,
    @Ctx() ctx: IContextBase
  ) {
    const eventModel = new AGVEventModel(ctx);
    return await eventModel.modify(data);
  }

  @Authorized(SUPERADMIN)
  @Query(() => HistoricResponse)
  async getEventHistory(@Arg("id") id: number, @Ctx() ctx: IContextBase) {
    const historyModel = new HistoricModel(AGVEventEntity, ctx);
    const result = await historyModel.getHistoric(id);
    return result.map((history) =>
      HistoricModel.ParseHistoricResponse(history)
    );
  }

  @Authorized(SUPERADMIN)
  @Query(() => [HistoricResponse])
  async getAllEventHistory(@Ctx() ctx: IContextBase) {
    const historyModel = new HistoricModel(AGVEventEntity, ctx);
    const result = await historyModel.getAllHistoric();
    return result.map((history) =>
      HistoricModel.ParseHistoricResponse(history)
    );
  }
}
