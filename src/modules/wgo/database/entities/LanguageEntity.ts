import { MediaEntity } from '@wisegar-org/wgo-opengar-core';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'languages' })
export class LanguageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: '' })
  code!: string;
  @Column({ default: false })
  disabled!: boolean;
  @Column({ default: false })
  default!: boolean;

  @Column({ nullable: true })
  logoId: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  logo: MediaEntity;
}