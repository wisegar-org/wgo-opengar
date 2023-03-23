import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BillEntity from './BillEntity';
import ProductEntity, { ProductType } from './ProductEntity';

@Entity()
export class BillProductRelationEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ default: 0 }) count: number;
  @Column({ default: 0, type: 'float' }) price: number;
  @Column({ default: ProductType.Product }) type: ProductType;

  @ManyToOne(() => BillEntity, { primary: false, nullable: true })
  @JoinColumn()
  bill: BillEntity;

  @ManyToOne(() => ProductEntity, { primary: false, nullable: true })
  @JoinColumn()
  product: ProductEntity;

  constructor(
    bill: BillEntity,
    product: ProductEntity,
    count: number,
    price: number,
    type: ProductType = ProductType.Product
  ) {
    super();
    if (bill) {
      this.bill = bill;
    }
    if (product) {
      this.product = product;
    }
    this.count = count;
    this.price = price;
    this.type = type;
  }
}

export default BillProductRelationEntity;
