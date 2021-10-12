import { JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Entity, Column, BaseEntity } from 'typeorm';
import { MediaEntity } from '@wisegar-org/wgo-opengar-core';

@Entity()
export class StorageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: '' })
  type: string;

  @Column({ type: 'json', default: {} })
  content: any;

  @Column({ nullable: true })
  imageId: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  image: MediaEntity;

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  imageList!: MediaEntity[];
}

export default StorageEntity;
