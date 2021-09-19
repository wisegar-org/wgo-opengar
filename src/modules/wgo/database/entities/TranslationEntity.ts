import { Language } from '@wisegar-org/wgo-opengar-shared';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LanguageEntity } from './LanguageEntity';

@Entity({ name: 'translations' })
export class TranslationEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: false }) key: string;
  @Column({ default: 'Empty' }) value: string;

  @Column({ nullable: false }) languageCode: string;
  @ManyToOne(() => LanguageEntity, (lang) => lang.code)
  language: LanguageEntity;
}

export default TranslationEntity;
