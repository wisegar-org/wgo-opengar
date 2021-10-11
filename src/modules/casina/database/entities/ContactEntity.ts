import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import _ from 'lodash';

@Entity({ name: 'contact' })
export class ContactEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ default: '' })
  contactName: string;
  @Column({ default: '' })
  address: string;
  @Column({ default: '' })
  email: string;
  @Column({ default: '' })
  phoneNumber: string;
  @Column({ default: '' })
  mapPath: string;
}

export default ContactEntity;
