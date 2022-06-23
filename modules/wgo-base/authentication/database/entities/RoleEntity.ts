import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import "reflect-metadata";
import { UserEntity } from "./UserEntity";

@Entity({ name: "roles" })
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users?: UserEntity[];
}
