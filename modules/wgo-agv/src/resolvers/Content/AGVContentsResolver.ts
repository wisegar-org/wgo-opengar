import { Arg, Mutation, Query, Resolver, Authorized, Ctx } from "type-graphql";
import { AGVContentModel } from "../../models/Content/ContentModel";
import { SUPERADMIN } from "../../wgo-base/models/authentication";
import { IContextBase } from "../../wgo-base/models/core/context";
import { HistoricModel } from "../../wgo-base/server/historic/models/HistoricModel";
import { HistoricResponse } from "../../wgo-base/server/historic/resolvers/HistoricResponses";
import { AGVContentsInput } from "./AGVContentsInputs";
import { AGVContentsResponse } from "./AGVContentsResponses";

@Resolver()
export class AGVContentsResolver {
  @Query(() => AGVContentsResponse)
  async agvAllContents(
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    const contentModel = new AGVContentModel(ctx);
    const contents = await contentModel.getContents();
    return <AGVContentsResponse>{ contents: JSON.stringify(contents) };
  }

  @Authorized(SUPERADMIN)
  @Mutation(() => Boolean)
  async agvModifyContents(
    @Arg("data") data: AGVContentsInput,
    @Ctx() ctx: IContextBase
  ) {
    const contentModel = new AGVContentModel(ctx);
    return !!(await contentModel.setContents(data));
  }

  @Authorized(SUPERADMIN)
  @Query(() => HistoricResponse)
  async agvGetContentHistory(@Arg("id") id: number, @Ctx() ctx: IContextBase) {
    const contentModel = new AGVContentModel(ctx);
    const result = await contentModel.getAllHistory();
    return result.map((historic: any) =>
      HistoricModel.ParseHistoricResponse(historic)
    );
  }
}
