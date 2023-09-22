import {
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
} from "typeorm";
import "reflect-metadata";
import { MediaEntity } from "../../../storage";

@Entity()
export class IndexContentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  imageId!: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  image!: MediaEntity;
}

export default IndexContentEntity;
