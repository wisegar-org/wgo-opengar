import { FrequencyRepeatEnum, MediaEntity } from '@wisegar-org/wgo-opengar-core';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import CollaboratorEntity from './CollaboratorEntity';
import { ExpenseStatusEnum } from './ExpenseEntity';

@Entity()
export class IncomeEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ default: '' }) name: string;
  @Column({ default: '' }) description: string;
  @Column({ type: 'float', default: 0 }) amount: number;
  @Column({ default: new Date(Date.now()) }) date: Date;
  @Column({ default: FrequencyRepeatEnum.Never }) repeat: FrequencyRepeatEnum;
  @Column({ default: ExpenseStatusEnum.ToByPayed }) status: ExpenseStatusEnum;

  @Column({ nullable: true }) collaboratorId!: number;
  @ManyToOne(() => CollaboratorEntity, (col) => col.transactions, {
    nullable: true,
  })
  collaborator!: CollaboratorEntity;

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  invoiceDocs!: MediaEntity[];

  constructor(
    name: string,
    description: string,
    amount: number,
    date: Date,
    repeat = FrequencyRepeatEnum.Never,
    status = ExpenseStatusEnum.ToByPayed
  ) {
    super();
    this.name = name;
    this.description = description;
    this.date = date;
    this.amount = amount;
    this.repeat = repeat;
    this.status = status;
  }
}

export default IncomeEntity;
