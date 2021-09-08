import { ApolloError } from 'apollo-client';
import { Arg, Query, Resolver } from 'type-graphql';
import { EmailModel } from '../../models/EmailModel';
import { EmailFromToAppInputGQL, EmailInputGQL, EmailToAppInputGQL } from '../types/inputs/EmailInputGQL';
import { EmailResponseGQL } from '../types/responses/EmailResponseGQL';

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

  @Query(() => EmailResponseGQL)
  async sendEmailToApp(@Arg('data') data: EmailToAppInputGQL): Promise<EmailResponseGQL> {
    try {
      return await this.emailModel.sendEmailToApp(data);
    } catch (error) {
      throw new ApolloError({
        errorMessage: error,
      });
    }
  }

  @Query(() => EmailResponseGQL)
  async sendEmailFromToApp(@Arg('data') data: EmailFromToAppInputGQL): Promise<EmailResponseGQL> {
    try {
      return await this.emailModel.sendEmailFromToApp(data);
    } catch (error) {
      throw new ApolloError({
        errorMessage: error,
      });
    }
  }
}
