import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { IContextBase } from "@wisegar-org/wgo-base-models";
import { CasinaIndexContentInputs } from "./IndexContentInputs";
import { IndexContentModel } from "./IndexContentModel";
import { CasinaIndexContentResponse } from "./IndexContentResponses";

@Resolver()
export class IndexContentResolver {
  @Query(() => CasinaIndexContentResponse)
  async getCasinaIndexContent(
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    const indexContent = new IndexContentModel(ctx);
    return await indexContent.getCasinaIndexContent(urlApi);
  }

  @Mutation(() => Boolean)
  async setCasinaIndexContent(
    @Arg("data") data: CasinaIndexContentInputs,
    @Ctx() ctx: IContextBase
  ) {
    const indexContent = new IndexContentModel(ctx);
    return await indexContent.setCasinaIndexContent(data);
  }
}
