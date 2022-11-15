import {
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
} from "typeorm";
import { WGBaseEntity } from "../../wgo-base/core/database/entities/WGBaseEntity";
import AGVEventEntity from "./AGVEventEntity";

@Entity()
export class AGVInscriptionEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "" })
  nome!: string;
  @Column({ default: "" })
  cognome!: string;
  @Column({ default: "" })
  email!: string;
  @Column({ default: "" })
  phone!: string;
  @Column({ default: "" })
  message!: string;
  @Column({ default: "" })
  class!: string;
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  inscriptionDate!: Date;

  @Column({ nullable: true }) eventId!: number;
  @ManyToOne(() => AGVEventEntity, (evnt) => evnt.id, {
    nullable: true,
  })
  event!: AGVEventEntity;
}
