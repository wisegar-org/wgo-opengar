import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import UserEntity from '../entities/UserEntity';

@Service()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

}