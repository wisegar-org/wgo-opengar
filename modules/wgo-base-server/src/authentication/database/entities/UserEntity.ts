import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Unique,
  ManyToOne,
} from "typeorm";
import { RoleEntity } from "./RoleEntity";
import "reflect-metadata";
import { WGBaseEntity } from "../../../core/database/entities/WGBaseEntity";
import MediaEntity from "../../../storage/database/entities/MediaEntity";
import { LanguageEntity } from "../../../language/database/entities/LanguageEntity";

@Entity({ name: "users" })
@Unique("userName-unique", ["userName", "code"])
export class UserEntity extends WGBaseEntity {
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

  @Column({ nullable: true, default: "" })
  code!: string;

  @Column({ nullable: true, default: "" })
  cap!: string;

  @Column({ nullable: true, default: "" })
  phone!: string;

  @Column({ nullable: true, default: "" })
  address!: string;

  @Column({ default: false })
  isEmailConfirmed?: boolean;

  @Column({ nullable: true })
  confirmationToken?: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles?: RoleEntity[];

  @Column({ nullable: true })
  profileImageId!: number;
  @ManyToOne(() => MediaEntity, (media: any) => media.id)
  profileImage!: MediaEntity;

  @Column({ nullable: true })
  languageId!: number;
  @ManyToOne(() => LanguageEntity, (lang: any) => lang.id)
  language!: LanguageEntity;
}
