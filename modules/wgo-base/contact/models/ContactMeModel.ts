import { DataSource, Repository } from "typeorm";
import { IContactModel } from ".";
import { IContextBase } from "../../core/models/context";
import ContactMeEntity from "../database/entities/ContactMeEntity";

export class ContactMeModel {
  ctx: IContextBase;
  dataSource: DataSource;
  contactRepository: Repository<ContactMeEntity>;
  /**
   *
   */
  constructor(ctx: IContextBase) {
    this.ctx = ctx;
    this.dataSource = ctx.dataSource;
    this.contactRepository = this.dataSource.getRepository(ContactMeEntity);
  }

  async getContactMeEntity(): Promise<IContactModel> {
    let contact = await this.contactRepository.findOne({
      where: {},
    });
    if (!contact) {
      contact = new ContactMeEntity();
      contact = await this.contactRepository.manager.save(contact);
    }
    return contact;
  }

  async getContactData(): Promise<IContactModel> {
    const contact = await this.getContactMeEntity();
    return contact;
  }

  async setContactData(contactData: IContactModel): Promise<boolean> {
    let contact = await this.contactRepository.findOne({
      where: {},
    });
    if (!contact) {
      contact = new ContactMeEntity();
    }
    contact.contactName = contactData.contactName;
    contact.address = contactData.address;
    contact.email = contactData.email;
    contact.phoneNumber = contactData.phoneNumber;
    contact.mapPath = contactData.mapPath;

    const result = !!(await this.contactRepository.manager.save(contact));
    return result;
  }
}
