import { MediaEntity } from '@wisegar-org/wgo-opengar-core';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import CollaboratorEntity from './CollaboratorEntity';

export enum ProductType {
  Product = 1,
  Service = 2,
}

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ default: '' }) name: string;
  @Column({ default: '' }) description: string;
  @Column({ type: 'float', default: 0 }) buyPrice: number;
  @Column({ type: 'float', default: 0 }) sellPrice: number;
  @Column({ default: 0 }) unitCount: number;
  @Column({ default: ProductType.Product }) type: ProductType;

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  docs!: MediaEntity[];

  constructor(
    name: string,
    description: string,
    buyPrice: number,
    sellPrice: number,
    unitCount: number,
    type: ProductType = ProductType.Product
  ) {
    super();
    this.name = name;
    this.description = description;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.unitCount = unitCount;
    this.type = type;
  }
}

export default ProductEntity;
