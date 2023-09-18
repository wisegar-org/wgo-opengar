import {
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import { EventStateEnum, EventTypeEnum } from "../../models/enums";
import { WGBaseEntity, MediaEntity } from "@wisegar-org/wgo-base-server";
import { AGVInscriptionEntity } from "./AGVInscriptionEntity";

@Entity()
export class AGVEventEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;
  @Column({ default: "", type: "text" })
  description!: string;
  @Column({ default: "", type: "text" })
  shortDescription!: string;
  @Column({ default: "" })
  class!: string;
  @Column({ default: EventTypeEnum.Event })
  type!: string;

  @Column({ nullable: true })
  startDate!: Date;
  @Column({ nullable: true })
  endDate!: Date;

  @Column({ default: true })
  visible!: boolean;
  @Column({ default: true })
  enrollment!: boolean;

  @Column({ default: EventStateEnum.Waiting })
  state!: string;

  @Column({ nullable: true })
  imgTitleId!: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  imgTitle!: MediaEntity;

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  imgList!: MediaEntity[];

  @OneToMany(() => AGVInscriptionEntity, (inscription) => inscription.event, {
    cascade: true,
  })
  inscriptions?: AGVInscriptionEntity[];
}

export default AGVEventEntity;
