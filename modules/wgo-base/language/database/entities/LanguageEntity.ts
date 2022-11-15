import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { WGBaseEntity } from "../../../core/database/entities/WGBaseEntity";

@Entity({ name: "languages" })
export class LanguageEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: "" })
  code!: string;
  @Column({ default: false })
  enabled!: boolean;
  @Column({ default: false })
  default!: boolean;
}
