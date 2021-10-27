import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class OrganizationDataEntity extends BaseEntity {
  @PrimaryColumn() id: number;
  @Column({ nullable: true, default: '' }) name?: string;
  @Column({ nullable: true, default: '' }) description?: string;
  @Column({ nullable: true, default: '' }) address?: string;
  @Column({ nullable: true, default: '' }) place?: string;
  @Column({ nullable: true, default: 0 }) cap?: number;
  @Column({ nullable: true, default: '' }) phone?: string;
  @Column({ nullable: true, default: '' }) email?: string;
  @Column({ nullable: true, default: '' }) web?: string;
  @Column({ nullable: true, default: 'h' }) accountingUnit?: string;
  @Column({ nullable: true, default: 'CHF' }) accountingCoin?: string;
  @Column({ nullable: true, default: 'FakeAccount' }) accountingLabel?: string;
  @Column({ type: 'float', nullable: true, default: 0 })
  accountingInternetPrice?: number;
  @Column({ nullable: true, default: '' }) bankName?: string;
  @Column({ nullable: true, default: '' }) bankBIC?: string;
  @Column({ nullable: true, default: '' }) bankIBAN?: string;
  @Column({ nullable: true, default: '' }) bankNo?: string;
  @Column({ nullable: true, default: '' }) bankPlace?: string;
  @Column({ nullable: true, default: '' }) bankAddress?: string;
  @Column({ nullable: true, default: 30 }) bankValidDays?: number;

  /**
   *
   */
  constructor(id: number) {
    super();
    this.id = id;
  }
}

export default OrganizationDataEntity;
