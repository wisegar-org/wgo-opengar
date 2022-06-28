import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { LanguageEntity } from "../../../language/database/entities/LanguageEntity";

@Entity({ name: "translations" })
export class TranslationEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ nullable: false }) key!: string;
  @Column({ default: "Empty" }) value!: string;

  @Column({ nullable: true }) languageId!: number;
  @ManyToOne(() => LanguageEntity, (lang) => lang.id)
  language!: LanguageEntity;
}
