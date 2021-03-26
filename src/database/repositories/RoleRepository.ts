import { EntityRepository, Repository } from "typeorm";
import { RolEntity } from "@wisegar-org/wgo-opengar-core";
import { Service } from "typedi";
@Service()
@EntityRepository(RolEntity)
export class RoleRepository extends Repository<RolEntity> {}
