import { JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Entity, Column, BaseEntity } from 'typeorm';
import { MediaEntity } from '@wisegar-org/wgo-opengar-core';
import { EventStateEnum, EventTypeEnum } from '../../models';

@Entity()
export class AGVEventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;
  @Column({ default: '', type: 'text' })
  description: string;
  @Column({ default: '', type: 'text' })
  shortDescription: string;
  @Column({ default: '' })
  class: string;
  @Column({ default: EventTypeEnum.Event })
  type: EventTypeEnum;

  @Column({ nullable: true })
  startDate: Date;
  @Column({ nullable: true })
  endDate: Date;

  @Column({ default: true })
  visible: boolean;
  @Column({ default: true })
  enrollment: boolean;

  @Column({ default: EventStateEnum.Waiting })
  state: EventStateEnum;

  @Column({ nullable: true })
  imgTitleId: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  imgTitle: MediaEntity;

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  imgList!: MediaEntity[];
}

export default AGVEventEntity;
