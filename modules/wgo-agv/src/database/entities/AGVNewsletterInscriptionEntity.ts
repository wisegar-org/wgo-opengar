import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { AGVNewsletterInscriptionStatusEnum } from "../../models/enums";
import { WGBaseEntity } from "@wisegar-org/wgo-base-server";

@Entity()
export class AGVNewsletterInscriptionEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: "" })
  email!: string;
  @Column({ default: AGVNewsletterInscriptionStatusEnum.Waiting })
  status!: AGVNewsletterInscriptionStatusEnum;
}
