import { ApolloError } from 'apollo-client';
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { MediaModel } from '../models/MediaModel';
import { MediaInputGQL, MediaResponseGQL, MediasInputGQL } from '../modules';

@Resolver()
export class MediaResolver {
  private mediaModel: MediaModel;
  constructor() {
    this.mediaModel = new MediaModel();
  }

  @Mutation(() => MediaResponseGQL)
  async saveImage(@Arg('data') data: MediaInputGQL, @Arg('urlApi') urlApi: string) {
    try {
      return await this.mediaModel.uploadFile(data, urlApi);
    } catch (error) {
      throw new ApolloError({
        errorMessage: error,
      });
    }
  }

  @Mutation(() => [MediaResponseGQL])
  async saveFiles(@Arg('data') data: MediasInputGQL, @Arg('urlApi') urlApi: string) {
    try {
      return await this.mediaModel.uploadFiles(data, urlApi);
    } catch (error) {
      throw new ApolloError({
        errorMessage: error,
      });
    }
  }

  @Query(() => MediaResponseGQL)
  async getFile(@Arg('id') id: number) {
    try {
      return await this.mediaModel.getFile(id);
    } catch (error) {
      throw new ApolloError({
        errorMessage: error,
      });
    }
  }
}
