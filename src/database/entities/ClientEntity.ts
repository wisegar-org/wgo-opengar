import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BillEntity } from "./BillEntity";
const mappingConfig = require("../mappings/mapping.json");

@Entity({ name: "clients" })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column()
  sex: string;

  @Column()
  civilStatus: string;

  @Column()
  principalAddress: string;

  @Column()
  principalCap: string;

  @Column()
  principalCity: string;

  @Column()
  principalMail: string;

  @Column()
  principalPhone: string;

  @Column()
  secundaryAddress?: string;

  @Column()
  secundaryCap?: string;

  @Column()
  secundaryCity?: string;

  @Column()
  secundaryMail?: string;

  @Column()
  secundaryPhone?: string;

  @OneToMany(() => BillEntity, (bill) => bill.client)
  bills: BillEntity[];
  /**
   *
   */
  constructor(
    name?: string,
    lastName?: string,
    birthDate?: Date,
    sex?: string,
    civilStatus?: string
  ) {
    this.name = name || "";
    this.lastName = lastName || "";
    this.birthDate = birthDate || new Date();  //TODO borrar el new Date poner null
    this.sex = sex || "M";
    this.civilStatus = civilStatus || "";
  }

  setPrincipalInfo(
    address: string,
    cap: string,
    city: string,
    mail: string,
    phone: string
  ) {
    this.principalAddress = address;
    this.principalCap = cap;
    this.principalCity = city;
    this.principalMail = mail;
    this.principalPhone = phone;
  }

  setSecondaryInfo(
    address: string,
    cap: string,
    city: string,
    mail: string,
    phone: string
  ) {
    this.secundaryAddress = address || "";
    this.secundaryCap = cap || "";
    this.secundaryCity = city || "";
    this.secundaryMail = mail || "";
    this.secundaryPhone = phone || "";
  }

  toClientEntity(obj: any): ClientEntity {
    const client = new ClientEntity();

    Object.keys(mappingConfig.ProductEntity.fields).forEach((property) => {
      client[property] = obj[mappingConfig.ProductEntity.fields[property]];
    });

    return client;
  }
}

export default ClientEntity;
