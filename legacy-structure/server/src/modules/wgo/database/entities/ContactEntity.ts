import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import _ from 'lodash';

@Entity({ name: 'wgo_contact' })
export class WGOContactEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ default: '' })
  module: string;
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

export default WGOContactEntity;
