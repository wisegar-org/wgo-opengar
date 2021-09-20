import { ApolloError } from 'apollo-client';
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { MediaModel } from '../models/MediaModel';
import { MediaInputGQL, MediaResponseGQL } from '../modules';

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
}
