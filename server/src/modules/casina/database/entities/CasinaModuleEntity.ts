import { ManyToOne, PrimaryGeneratedColumn, Entity, Column, BaseEntity } from 'typeorm';
import { MediaEntity } from '@wisegar-org/wgo-opengar-core';

@Entity()
export class CasinaModuleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  imageId: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  image: MediaEntity;
}

export default CasinaModuleEntity;
