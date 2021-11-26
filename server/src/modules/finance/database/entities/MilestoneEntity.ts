import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity()
export class MilestoneEntity extends BaseEntity {
  @PrimaryColumn() id: number
  @Column() title: string

  constructor(numberId: number, title: string) {
    super()
    this.id = numberId
    this.title = title
  }
}

export default MilestoneEntity
