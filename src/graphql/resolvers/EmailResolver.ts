import { ApolloError } from 'apollo-client';
import { Arg, Query, Resolver } from 'type-graphql';
import { EmailModel } from '../../models/EmailModel';
import { EmailInputGQL } from '../types/inputs/EmailInputGQL';
import { EmailResponseGQL } from '../types/responses/EmailResponseGQL';
import { MediaResponseGQL } from '../types/responses/MediaResponseGQL';

@Resolver()
export class EmailResolver {
  private emailModel: EmailModel;
  constructor() {
    this.emailModel = new EmailModel();
  }

  @Query(() => EmailResponseGQL)
  async sendEmail(@Arg('data') data: EmailInputGQL): Promise<EmailResponseGQL> {
    try {
      return await this.emailModel.sendEmail(data);
    } catch (error) {
      throw new ApolloError({
        errorMessage: error,
      });
    }
  }
}
