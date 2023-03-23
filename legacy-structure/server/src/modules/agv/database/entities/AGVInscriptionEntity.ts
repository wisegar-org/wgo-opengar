import { ManyToOne, PrimaryGeneratedColumn, Entity, Column, BaseEntity } from 'typeorm';
import AGVEventEntity from './AGVEventEntity';

@Entity()
export class AGVInscriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: '' })
  nome: string;
  @Column({ default: '' })
  cognome: string;
  @Column({ default: '' })
  email: string;
  @Column({ default: '' })
  phone: string;
  @Column({ default: '' })
  message: string;
  @Column({ default: '' })
  class: string;
  @Column({ default: new Date(Date.now()) })
  inscriptionDate: Date;

  @Column({ nullable: true }) eventId!: number;
  @ManyToOne(() => AGVEventEntity, (evnt) => evnt.id, {
    nullable: true,
  })
  event: AGVEventEntity;
}
