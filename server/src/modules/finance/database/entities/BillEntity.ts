import { MediaEntity } from '@wisegar-org/wgo-opengar-core';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import BillProductRelationEntity from './BillProductRelationEntity';
import CollaboratorEntity from './CollaboratorEntity';

export enum BillStatus {
  Pending = 1,
  Sent = 2,
  Payed = 3,
  Cancelled = 4,
}

@Entity()
export class BillEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ default: '' }) name: string;
  @Column({ default: '' }) description: string;
  @Column({ default: '' }) observations: string;
  @Column({ type: 'float', default: 0 }) totalPrice: number;
  @Column({ type: 'float', default: 0 }) totalWithDiscount: number;
  @Column({ default: new Date(Date.now()) }) date: Date;
  @Column({ default: null }) sendDate: Date;
  @Column({ default: 30 }) validDays: number;
  @Column({ type: 'float', default: 0 }) discount: number;
  @Column({ default: BillStatus.Pending }) status: BillStatus;

  @Column({ nullable: true }) clientId!: number;
  @ManyToOne(() => CollaboratorEntity, (col) => col.id, {
    nullable: true,
  })
  client!: CollaboratorEntity;

  @OneToMany(() => BillProductRelationEntity, (billProducts) => billProducts.bill, {
    nullable: true,
  })
  billProducts!: BillProductRelationEntity[];

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  docs!: MediaEntity[];

  constructor(name: string, description: string, totalPrice: number, client: CollaboratorEntity) {
    super();
    this.name = name;
    this.description = description;
    this.totalPrice = totalPrice;
    if (client) {
      this.client = client;
      this.clientId = client.id;
    }
  }
}

export default BillEntity;