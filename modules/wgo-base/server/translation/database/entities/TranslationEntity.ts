import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { WGBaseEntity } from "../../../core/database/entities/WGBaseEntity";
import { LanguageEntity } from "../../../language/database/entities/LanguageEntity";

@Entity({ name: "translations" })
export class TranslationEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ nullable: false }) key!: string;
  @Column({ default: "Empty" }) value!: string;

  @Column({ nullable: true }) languageId!: number;
  @ManyToOne(() => LanguageEntity, (lang) => lang.id)
  language!: LanguageEntity;
}
