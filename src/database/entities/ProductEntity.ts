import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { BillEntity } from "./BillEntity";
const mappingConfig = require("../mappings/mapping.json");

@Entity({ name: "products" })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  treatment: string;

  @Column()
  ratio: number;

  @Column()
  diameter: number;

  @Column()
  caliber: number;

  @Column()
  color: string;

  @Column()
  purchaseDate: Date;

  @Column()
  saleDate: Date;

  @Column()
  provider: string;

  @Column()
  productStatus: string;

  @Column()
  brand: string;

  @Column()
  salesMargin: string;

  @Column()
  model: string;

  @Column()
  material: string;

  @Column()
  purchasePrice: number;

  @Column()
  salePrice: number;

  @Column()
  owner: string;

  @Column()
  status: string;

  @ManyToOne(() => BillEntity, (bill) => bill.id)
  bill: BillEntity;

  toProductEntity(obj: any): ProductEntity {
    const product = new ProductEntity();

    Object.keys(mappingConfig.ProductEntity.fields).forEach((property) => {
      product[property] = obj[mappingConfig.ProductEntity.fields[property]];
    });

    return product;
  }
}

export default ProductEntity;
