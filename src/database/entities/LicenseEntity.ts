import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "license" })
export class LicenseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  status: string;

  @Column()
  hour: Date;

  @Column()
  date: Date;

  /**
   *
   */
  constructor(text: string, status: string, hour: Date, date: Date) {
    this.text = text;
    this.status = status;
    this.hour = hour;
    this.date = date;
  }
}

export default LicenseEntity;
