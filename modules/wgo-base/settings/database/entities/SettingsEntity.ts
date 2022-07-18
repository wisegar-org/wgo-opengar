import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";

@Entity({ name: "settings" })
export class SettingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "", unique: true })
  type!: string;

  @Column({ type: "json", default: {} })
  settings!: any;
}

export default SettingsEntity;
