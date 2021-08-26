import { ApolloError } from 'apollo-client';
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { MediaModel } from '../../models/MediaModel';
import { MediaInputGQL } from '../types/inputs/MediaInputGQL';
import { MediaResponseGQL } from '../types/responses/MediaResponseGQL';

@Resolver()
export class MediaResolver {
  private mediaModel: MediaModel;
  constructor() {
    this.mediaModel = new MediaModel();
  }

  @Authorized()
  @Mutation(() => MediaResponseGQL)
  async saveImage(@Arg('data') data: MediaInputGQL) {
    try {
      return await this.mediaModel.uploadFile(data);
    } catch (error) {
      throw new ApolloError({
        errorMessage: error,
      });
    }
  }
}
