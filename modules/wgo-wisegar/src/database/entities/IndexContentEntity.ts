import {
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
} from "typeorm";
import MediaEntity from "../../wgo-base/storage/database/entities/MediaEntity";
import "reflect-metadata";

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
