import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { EmailHistoryEntity } from "./EmailHistoryEntity";

@Entity({ name: "email_media" })
export class EmailMediaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "" })
  name!: string;

  @Column({ default: "" })
  senderTo!: string;

  @Column({ default: "" })
  fileName!: string;

  @Column({ default: "" })
  fileExt!: string;

  @Column({ type: "bytea" })
  fileContent!: Buffer;

  @Column({ default: false })
  isPublic!: boolean;

  @Column({ default: "", unique: true })
  contentId!: string;

  @Column({ default: "" })
  contentType!: string;

  @Column({ default: 0 })
  size!: number;

  @ManyToOne(() => EmailHistoryEntity, { nullable: true })
  @JoinColumn()
  email!: EmailHistoryEntity;
}
