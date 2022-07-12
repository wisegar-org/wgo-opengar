import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm';
import { UserEntity } from '../../../../wgo-base/authentication/database/entities/UserEntity';

@Entity({ name: 'employees' })
export class EmployeesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: '' })
  name!: string;

  @Column({ default: '' })
  email!: string;

  @ManyToMany(() => UserEntity)
  @JoinColumn()
  enterprise_id!: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinColumn()
  client_id!: UserEntity;
}
