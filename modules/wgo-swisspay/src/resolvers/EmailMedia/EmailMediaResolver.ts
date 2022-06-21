import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { PostgresDataSource } from '../../../dataSources';
import { DataSource } from 'typeorm';
import { EmailMediaResponse, EmailResponse } from './EmailMediaResponses';
import { EmailMediaFilterInput } from './EmailMediaInputs';
import { EmailMediaService } from '../../services/EmailMediaService';
import { IdInput } from '../Core/CoreInputs';

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
  async getAllEmailMedia(@Arg('data') data: EmailMediaFilterInput) {
    const emailMediaModel = new EmailMediaService(this.dataSource);
    const emails = await emailMediaModel.getAllEmails(data);
    return emails as EmailMediaResponse[];
  }

  @Authorized()
  @Query(() => EmailResponse)
  async getEmail(@Arg('data') data: IdInput) {
    const emailMediaModel = new EmailMediaService(this.dataSource);
    const email = await emailMediaModel.getEmailById(data);
    return email;
  }
}
