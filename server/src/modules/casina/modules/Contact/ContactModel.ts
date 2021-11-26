import { Connection, Repository } from 'typeorm';
import ContactEntity from '../../database/entities/ContactEntity';

export interface IContact {
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

  async getContactEntity(): Promise<ContactEntity> {
    let contact = await this.contactRepository.findOne();
    if (!contact) {
      contact = new ContactEntity();
      contact = await this.contactRepository.manager.save(contact);
    }
    return contact;
  }

  async getContactData(): Promise<IContact> {
    const contact = await this.getContactEntity();
    return contact;
  }

  async setContactData(contactData: IContact): Promise<boolean> {
    let contact = await this.contactRepository.findOne();
    if (!contact) {
      contact = new ContactEntity();
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
