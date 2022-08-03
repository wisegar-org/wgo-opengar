import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "contact_me" })
export class ContactMeEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ default: "" })
  contactName!: string;
  @Column({ default: "" })
  address!: string;
  @Column({ default: "" })
  email!: string;
  @Column({ default: "" })
  phoneNumber!: string;
  @Column({ default: "" })
  mapPath!: string;
}

export default ContactMeEntity;
