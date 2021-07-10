import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CollaboratorEntity } from './CollaboratorEntity'

export enum TransactionTypeEnum {
  Income = "Income",
  Expense = "Expense"
}
@Entity()
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number
  @Column() status: string
  @Column() date: Date
  @Column({ type: 'float' }) cost: number
  @Column({ type: 'float' }) card_balance: number
  @Column({ default: TransactionTypeEnum.Expense}) type!: TransactionTypeEnum

  @Column({ nullable: true }) sourceID!: number
  @Column({ default: '' }) idTransaction!: string

  @Column({ nullable: true }) collaboratorId!: number
  @ManyToOne(() => CollaboratorEntity, (col) => col.transactions, {
    nullable: true
  })
  collaborator!: CollaboratorEntity

  constructor(status: string, date: Date, cost: number, card_balance: number, collaborator?: CollaboratorEntity) {
    super()
    this.status = status
    this.date = date
    this.cost = cost
    this.card_balance = card_balance
    if (collaborator !== undefined) {
      this.collaboratorId = collaborator.id
      this.collaborator = collaborator
    }
  }
}

export default TransactionEntity
