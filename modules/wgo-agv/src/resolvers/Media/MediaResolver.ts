import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { IContextBase } from "@wisegar-org/wgo-base-models/build/core/context";
import {
  MEDIA_PATH_POST_FILE,
  MEDIA_PATH_POST_FILES,
} from "@wisegar-org/wgo-base-models/build/storage/server";
import { MediaResolver } from "@wisegar-org/wgo-base-server/build/storage/resolvers/Media/MediaResolver";
import { MediaResponse } from "@wisegar-org/wgo-base-server/build/storage/resolvers/Media/MediaResponses";
import { MediaInput, MediasInput } from "./MediaInput";

@Resolver()
export class PublicMediaResolver extends MediaResolver {
  @Authorized()
  @Mutation(() => MediaResponse, { name: MEDIA_PATH_POST_FILE })
  async saveFile(
    @Arg("data") data: MediaInput,
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    return await this.saveFilePrivate(data, urlApi, ctx);
  }

  @Authorized()
  @Mutation(() => [MediaResponse], { name: MEDIA_PATH_POST_FILES })
  async saveFiles(
    @Arg("data") data: MediasInput,
    @Arg("urlApi") urlApi: string,
    @Ctx() ctx: IContextBase
  ) {
    const result: MediaResponse[] = await this.saveFilesPrivate(
      data,
      urlApi,
      ctx
    );
    return result;
  }
}
