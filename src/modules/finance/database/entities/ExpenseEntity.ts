import { MediaEntity, FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-core';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import CollaboratorEntity from './CollaboratorEntity';

export enum ExpenseStatusEnum {
  ToByPayed = 1,
  Payed = 2,
}

@Entity()
export class ExpenseEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ default: '' }) name: string;
  @Column({ default: '' }) description: string;
  @Column({ type: 'float', default: 0 }) cost: number;
  @Column({ default: new Date(Date.now()) }) date: Date;
  @Column({ default: ExpenseStatusEnum.ToByPayed }) status: ExpenseStatusEnum;
  @Column({ default: FrequencyRepeatEnum.Never }) repeat: FrequencyRepeatEnum;

  @Column({ nullable: true }) collaboratorId!: number;
  @ManyToOne(() => CollaboratorEntity, (col) => col.transactions, {
    nullable: true,
  })
  collaborator!: CollaboratorEntity;

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  bildDocs!: MediaEntity[];

  constructor(
    name: string,
    description: string,
    cost: number,
    date: Date,
    status = ExpenseStatusEnum.ToByPayed,
    repeat = FrequencyRepeatEnum.Never
  ) {
    super();
    this.name = name;
    this.description = description;
    this.status = status;
    this.date = date;
    this.cost = cost;
    this.repeat = repeat;
  }
}

export default ExpenseEntity;
