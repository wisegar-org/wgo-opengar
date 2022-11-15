import 'reflect-metadata';
import { Column, Entity } from 'typeorm';
import { WGBaseEntity } from '../../../core/database/entities/WGBaseEntity';
import { Actions } from '../../models';

@Entity({ name: 'journal_history' })
export class HistoricEntity extends WGBaseEntity {
  @Column()
  entity!: string;
  @Column()
  recordId!: number;
  @Column()
  userId!: number;
  @Column()
  username!: string;
  @Column()
  message!: string;
  @Column({ type: 'enum', enum: Actions })
  action!: Actions;

  @Column({ type: 'jsonb', nullable: true })
  snapshot?: Array<{ id: string }>;
}
