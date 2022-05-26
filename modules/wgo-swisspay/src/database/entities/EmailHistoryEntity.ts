import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { EmailMediaEntity } from "./EmailMediaEntity";

@Entity({ name: "email_history" })
export class EmailHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "" })
  from!: string;

  @Column({ default: "" })
  to!: string;

  @Column({ default: "" })
  cc!: string;

  @Column({ default: "" })
  bcc!: string;

  @Column({ default: "" })
  subject!: string;

  @Column({ default: "" })
  headers!: string;

  @Column({ default: new Date() })
  date!: Date;

  @Column({ default: "" })
  messageId!: string;

  @Column({ default: "" })
  inReplyTo!: string;

  @Column({ default: "" })
  replyTo!: string;

  @Column({ default: "" })
  references!: string;

  @Column({ default: "" })
  html!: string;

  @Column({ default: "" })
  text!: string;

  @Column({ default: "" })
  textAsHtml!: string;

  @OneToMany(() => EmailMediaEntity, (media) => media.contentId, {
    cascade: true,
  })
  attachments?: EmailMediaEntity[];
}
