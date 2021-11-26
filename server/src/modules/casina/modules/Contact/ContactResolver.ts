import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { GetConnection } from '../../database';
import { ContactInputGQL } from './ContactInputsGQL';
import { ContactModel, IContact } from './ContactModel';
import { ContactResponseGQL } from './ContactResponseGQL';

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

  @Query(() => ContactResponseGQL)
  async getContactData() {
    const result = await this.contactModel.getContactData();
    return result as ContactResponseGQL;
  }

  @Mutation(() => Boolean)
  async setContactData(@Arg('data') data: ContactInputGQL) {
    const result = await this.contactModel.setContactData(data as IContact);
    return result;
  }
}
