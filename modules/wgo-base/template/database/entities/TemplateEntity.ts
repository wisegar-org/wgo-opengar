import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";

@Entity({ name: "templates" })
export class TemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column({ type: "text" })
  body!: string;
  @Column({ default: "" })
  documentType!: string;
}

export default TemplateEntity;
