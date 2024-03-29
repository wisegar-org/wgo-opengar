import {
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
} from "typeorm";
import { WGBaseEntity } from "../../../core/database/entities/WGBaseEntity";
import MediaEntity from "./MediaEntity";

@Entity({ name: "storage" })
export class StorageEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "" })
  type!: string;

  @Column({ type: "json", default: {} })
  content: any;

  @Column({ nullable: true })
  imageId!: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  image!: MediaEntity;

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  imageList!: MediaEntity[];
}

export default StorageEntity;
