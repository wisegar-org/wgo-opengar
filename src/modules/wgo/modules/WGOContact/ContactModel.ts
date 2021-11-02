import { Connection, Repository } from 'typeorm';
import ContactEntity from '../../database/entities/ContactEntity';

export interface IContact {
  module: string,
  contactName: string,
  address: string,
  email: string,
  phoneNumber: string,
  mapPath: string
}

export class ContactModel {
  contactRepository: Repository<ContactEntity>;
  /**
   *
   */
  constructor(conn: Connection) {
    this.contactRepository = conn.getRepository(ContactEntity);
  }

  async getContactEntity(module: string): Promise<ContactEntity> {
    let contact = await this.contactRepository.findOne({
      module: module,
    });
    if (!contact) {
      contact = new ContactEntity();
      contact.module = module;
      contact = await this.contactRepository.manager.save(contact);
    }
    return contact;
  }

  async getContactData(module: string): Promise<IContact> {
    const contact = await this.getContactEntity(module);
    return contact;
  }

  async setContactData(contactData: IContact): Promise<boolean> {
    let contact = await this.contactRepository.findOne({
      module: contactData.module,
    });
    if (!contact) {
      contact = new ContactEntity();
      contact.module = contactData.module
    }
    contact.contactName = contactData.contactName
    contact.address = contactData.address
    contact.email = contactData.email
    contact.phoneNumber = contactData.phoneNumber
    contact.mapPath = contactData.mapPath
    
    const result = !!(await this.contactRepository.manager.save(contact));
    return result;
  }
}
