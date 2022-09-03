import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Unique,
} from "typeorm";
import { RoleEntity } from "./RoleEntity";
import "reflect-metadata";

@Entity({ name: "users" })
@Unique("userName-unique", ["userName", "code"])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: "" })
  name?: string;

  @Column({ nullable: false, default: "" })
  lastName?: string;

  @Column({ nullable: false, default: "" })
  userName!: string;

  @Column({ nullable: false, default: "" })
  email?: string;

  @Column({ nullable: false, default: "" })
  password!: string;

  @Column({ nullable: false, default: "" })
  certificate!: string;

  @Column({ nullable: true, default: " " })
  code!: string;

  @Column({ default: false })
  isEmailConfirmed?: boolean;

  @Column({ nullable: true })
  confirmationToken?: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles?: RoleEntity[];
}
