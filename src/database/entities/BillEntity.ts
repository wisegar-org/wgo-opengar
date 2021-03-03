import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import ClientEntity from "./ClientEntity";
import ProductEntity from "./ProductEntity";
const mappingConfig = require("../mappings/mapping.json");

@Entity({ name: "bills" })
export class BillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  billNumber: number;

  @Column()
  date: Date;

  @Column()
  lensDescription: string;

  @Column()
  lensPrice: number;

  @Column()
  frameDescription: string;

  @Column()
  framePrice: number;

  @Column()
  serviceDescription: string;

  @Column()
  servicePrice: number;

  @Column()
  offer: number;

  @Column()
  total: number;

  @Column()
  payment: number;

  @Column()
  balance: number;

  @Column()
  observation: string;

  @ManyToOne(() => ClientEntity, (client) => client.id)
  client: ClientEntity;

  @OneToMany(() => ProductEntity, (product) => product.bill)
  products: ProductEntity[];
}
