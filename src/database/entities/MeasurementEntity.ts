import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ClientEntity } from "./ClientEntity";
import { OpticEntity } from "./OpticEntity";
import mappingConfig from "../mappings/mapping.json";

@Entity({ name: "measurments" })
export class MeasurementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  SPH_Lontano_d: number;

  @Column()
  SPH_Lontano_s: number;

  @Column()
  CYL_Lontano_d: number;

  @Column()
  CYL_Lontano_s: number;

  @Column()
  AXE_Lontano_d: number;

  @Column()
  AXE_Lontano_s: number;

  @Column()
  ADD_Lontano_d: number;

  @Column()
  ADD_Lontano_s: number;

  @Column()
  Prisma_Lontano_d: number;

  @Column()
  Prisma_Lontano_s: number;

  @Column()
  DPL_Lontano_d: number;

  @Column()
  DPL_Lontano_s: number;

  @Column()
  DPV_Lontano_d: number;

  @Column()
  DPV_Lontano_s: number;

  @Column()
  H_Lontano_d: number;

  @Column()
  H_Lontano_s: number;

  @Column()
  SPH_Vicino_d: number;

  @Column()
  SPH_Vicino_s: number;

  @Column()
  CYL_Vicino_d: number;

  @Column()
  CYL_Vicino_s: number;

  @Column()
  AXE_Vicino_d: number;

  @Column()
  AXE_Vicino_s: number;

  @Column()
  ADD_Vicino_d: number;

  @Column()
  ADD_Vicino_s: number;

  @Column()
  Prisma_Vicino_d: number;

  @Column()
  Prisma_Vicino_s: number;

  @Column()
  DPL_Vicino_d: number;

  @Column()
  DPL_Vicino_s: number;

  @Column()
  DPV_Vicino_d: number;

  @Column()
  DPV_Vicino_s: number;

  @Column()
  H_Vicino_d: number;

  @Column()
  H_Vicino_s: number;

  @Column()
  data: Date;

  @ManyToOne(() => ClientEntity, (client) => client.id)
  bills: ClientEntity;

  @ManyToOne(() => OpticEntity, (optic) => optic.id)
  optic: OpticEntity;

  toMeasurementEntity(obj: any): MeasurementEntity {
    const measurment = new MeasurementEntity();

    Object.keys(mappingConfig.MeasurementEntity.fields).forEach((property) => {
      measurment[property] =
        obj[mappingConfig.MeasurementEntity.fields[property]];
    });

    return measurment;
  }
}

export default MeasurementEntity;
