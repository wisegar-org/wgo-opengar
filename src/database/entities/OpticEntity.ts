import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";

const mappingConfig = require("../mappings/mapping.json");

@Entity({ name: "optics" })
export class OpticEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  toOpticEntity(obj: any): OpticEntity {
    const optic = new OpticEntity();

    Object.keys(mappingConfig.OpticEntity.fields).forEach((property) => {
      optic[property] = obj[mappingConfig.OpticEntity.fields[property]];
    });

    return optic;
  }
}

export default OpticEntity;
