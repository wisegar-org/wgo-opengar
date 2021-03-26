import { Inject, Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "@wisegar-org/wgo-opengar-core";
@Service()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
