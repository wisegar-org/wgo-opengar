import { AccountEntity } from './AccountEntity'
import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IssueEntity } from './IssueEntity'
import { TransactionEntity } from './TransactionEntity'

@Entity()
export class CollaboratorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @Column({ default: 0 }) id_github: number
  @Column() name: string
  @Column() login: string
  @Column() node_id: string
  @Column() type: string
  @Column() avatar_url: string
  @Column() url: string
  @Column() location: string
  @Column() email: string
  @Column() bio: string
  @Column({ default: true }) isCollaborator!: boolean

  @Column({ nullable: true, default: '' }) card_number?: string
  @Column({ type: 'float', nullable: true, default: 0 }) pay_by_hours?: number
  @Column({ type: 'float', nullable: true, default: 0 })
  pay_to_internet?: number
  @Column({ nullable: true, default: '' }) address?: string

  @OneToMany(() => IssueEntity, (issue) => issue.assignedToId)
  issues?: IssueEntity[]

  @OneToMany(() => AccountEntity, (acc) => acc.contributorId)
  accounts?: AccountEntity[]

  @OneToMany(() => TransactionEntity, (issue) => issue.collaboratorId)
  transactions?: TransactionEntity[]

  constructor(
    numberId: number,
    login: string,
    node_id: string,
    type: string,
    avatar_url: string,
    url: string,
    name: string,
    location: string,
    email: string,
    bio: string,
    card_number?: string,
    pay_by_hours?: number,
    pay_to_internet?: number,
    address?: string
  ) {
    super()
    this.id_github = numberId
    this.login = login
    this.node_id = node_id
    this.type = type
    this.avatar_url = avatar_url
    this.url = url

    this.name = name
    this.location = location
    this.email = email
    this.bio = bio

    this.card_number = card_number
    this.pay_by_hours = pay_by_hours
    this.pay_to_internet = pay_to_internet
    this.address = address
  }
}

export default CollaboratorEntity