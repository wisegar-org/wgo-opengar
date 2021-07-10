import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity()
export class OrganizationDataEntity extends BaseEntity {
  @PrimaryColumn() id: number
  @Column({ nullable: true, default: '' }) name?: string
  @Column({ nullable: true, default: '' }) description?: string
  @Column({ nullable: true, default: '' }) address?: string
  @Column({ nullable: true, default: '' }) phone?: string
  @Column({ nullable: true, default: '' }) email?: string
  @Column({ nullable: true, default: 'h' }) accountingUnit?: string
  @Column({ nullable: true, default: 'CHF' }) accountingCoin?: string
  @Column({ nullable: true, default: 'FakeAccount' }) accountingLabel?: string

  @Column({ type: 'float', nullable: true, default: 0 })
  accountingInternetPrice?: number

  constructor(
    numberId: number,
    name?: string,
    description?: string,
    address?: string,
    phone?: string,
    email?: string,
    accountingUnit?: string,
    accountingCoin?: string,
    accountingInternetPrice?: number,
    accountingLabel?: string
  ) {
    super()
    this.id = numberId
    this.name = name
    this.description = description
    this.address = address
    this.phone = phone
    this.email = email
    this.accountingUnit = accountingUnit
    this.accountingCoin = accountingCoin
    this.accountingInternetPrice = accountingInternetPrice
    this.accountingLabel = accountingLabel
  }
}

export default OrganizationDataEntity
