import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { GetConnection } from '../../database';
import { WGOContactInputGQL } from './ContactInputsGQL';
import { ContactModel, IContact } from './ContactModel';
import { WGOContactResponseGQL } from './ContactResponseGQL';

@Resolver()
export class ContactResolver {
  contactModel: ContactModel;
  /**
   *
   */
  constructor() {
    const conn = GetConnection();
    this.contactModel = new ContactModel(conn);
  }

  @Query(() => WGOContactResponseGQL)
  async getWGOContactData(@Arg('module') module: string) {
    const result = await this.contactModel.getContactData(module);
    return result as WGOContactResponseGQL;
  }

  @Mutation(() => Boolean)
  async setWGOContactData(@Arg('data') data: WGOContactInputGQL) {
    const result = await this.contactModel.setContactData(data as IContact);
    return result;
  }
}
