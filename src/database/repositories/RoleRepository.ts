import { EntityRepository, Repository } from "typeorm";
import RolEntity from '../entities/RolEntity';

@EntityRepository(RolEntity)
export class RoleRepository extends Repository<RolEntity>{

}