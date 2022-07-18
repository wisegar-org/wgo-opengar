import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../../../wgo-base/authentication/database/entities/UserEntity';

@Entity({ name: 'employees' })
export class EmployeesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: '' })
  name!: string;

  @Column({ default: '' })
  email!: string;

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise_id!: UserEntity;

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'client_id' })
  client_id!: UserEntity;
}
