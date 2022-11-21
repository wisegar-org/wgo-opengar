import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import "reflect-metadata";
import { UserEntity } from "./UserEntity";
import { WGBaseEntity } from "../../../core/database/entities/WGBaseEntity";

@Entity({ name: "roles" })
export class RoleEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users?: UserEntity[];
}
