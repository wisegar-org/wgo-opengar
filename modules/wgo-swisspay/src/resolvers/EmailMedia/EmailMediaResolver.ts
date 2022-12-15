import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { EmailDetailsResponse, EmailMediaResponse, EmailResponse } from './EmailMediaResponses';
import { EmailMediaFilterInput } from './EmailMediaInputs';
import { EmailMediaService } from '../../services/EmailMediaService';
import { IContextBase } from '@wisegar-org/wgo-base-models';
import { IdInput } from '@wisegar-org/wgo-base-server';

@Resolver()
export class EmailMediaResolver {
  @Authorized()
  @Query(() => [EmailMediaResponse])
  async getAllEmailMedia(@Arg('data') data: EmailMediaFilterInput, @Ctx() ctx: IContextBase) {
    const emailMediaModel = new EmailMediaService(ctx.dataSource);
    const emails = await emailMediaModel.getAllEmails(data, ctx);
    return emails as EmailMediaResponse[];
  }

  @Authorized()
  @Query(() => EmailDetailsResponse)
  async getEmailMedia(@Arg('data') data: IdInput, @Ctx() ctx: IContextBase) {
    const emailMediaModel = new EmailMediaService(ctx.dataSource);
    const email = await emailMediaModel.getEmailMediaById(data, ctx);
    return email;
  }

  @Authorized()
  @Query(() => EmailResponse)
  async getEmail(@Arg('data') data: IdInput, @Ctx() ctx: IContextBase) {
    const emailMediaModel = new EmailMediaService(ctx.dataSource);
    const email = await emailMediaModel.getEmailById(data);
    return email;
  }
}
