import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { PostgresDataSource } from "../../dataSources";
import { IContextBase } from "../../wgo-base/core/models/context";
import { MediaModel } from "../../wgo-base/storage/models/MediaModel";
import { MediaResolver } from "../../wgo-base/storage/resolvers/MediaResolver";
import { MediaResponse } from "../../wgo-base/storage/resolvers/MediaResponses";
import { MediaInput, MediasInput } from "./MediaInput";

@Resolver()
export class PublicMediaResolver extends MediaResolver {
  @Mutation(() => MediaResponse)
  async saveFile(
    @Arg("data") data: MediaInput,
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    return await this.saveFilePrivate(data, urlApi, ctx.dataSource);
  }

  @Mutation(() => [MediaResponse])
  async saveFiles(
    @Arg("data") data: MediasInput,
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    const result: MediaResponse[] = await this.saveFilesPrivate(
      data,
      urlApi,
      ctx.dataSource
    );
    return result;
  }
}
