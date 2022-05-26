import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: "" })
  name?: string;

  @Column({ nullable: false, default: "" })
  lastName?: string;

  @Column({ nullable: false, default: "" })
  userName?: string;

  @Column({ nullable: false, default: "" })
  email?: string;

  @Column({ nullable: false, default: "" })
  password?: string;

  @Column({ default: false })
  isEmailConfirmed?: boolean;

  @Column({ nullable: true })
  confirmationToken?: string;

  constructor() {
    super();
  }
}
