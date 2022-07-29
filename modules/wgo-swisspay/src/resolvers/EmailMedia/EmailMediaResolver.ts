import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { PostgresDataSource } from '../../dataSources';
import { DataSource } from 'typeorm';
import { EmailDetailsResponse, EmailMediaResponse, EmailResponse } from './EmailMediaResponses';
import { EmailMediaFilterInput } from './EmailMediaInputs';
import { EmailMediaService } from '../../services/EmailMediaService';
import { IContext } from '../../models';
import { IdInput } from '../../wgo-base/core/resolvers/CoreInputs';

@Resolver()
export class EmailMediaResolver {
  private dataSource: DataSource;

  /**
   *
   */
  constructor() {
    this.dataSource = PostgresDataSource;
  }

  @Authorized()
  @Query(() => [EmailMediaResponse])
  async getAllEmailMedia(@Arg('data') data: EmailMediaFilterInput, @Ctx() ctx: any) {
    const emailMediaModel = new EmailMediaService(this.dataSource);
    const emails = await emailMediaModel.getAllEmails(data, ctx);
    return emails as EmailMediaResponse[];
  }

  @Authorized()
  @Query(() => EmailDetailsResponse)
  async getEmailMedia(@Arg('data') data: IdInput, @Ctx() ctx: any) {
    const emailMediaModel = new EmailMediaService(this.dataSource);
    const email = await emailMediaModel.getEmailMediaById(data, ctx);
    return email;
  }

  @Authorized()
  @Query(() => EmailResponse)
  async getEmail(@Arg('data') data: IdInput) {
    const emailMediaModel = new EmailMediaService(this.dataSource);
    const email = await emailMediaModel.getEmailById(data);
    return email;
  }
}
