import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import _ from 'lodash';
import { IMeta } from '../../modules/WGOSeo/SeoModel';

@Entity({ name: 'seo' })
export class SeoEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true })
  module: string;
  @Column({ default: './client/index.html' }) path: string;
  @Column({ type: 'json' }) meta: IMeta;
}

export default SeoEntity;
