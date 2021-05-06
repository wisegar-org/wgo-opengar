import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { RoleDataService } from "../../services/data-services/RoleDataService";
import { RoleFilterArgs, RoleInputGQL } from "../types/inputs/RoleInputGQL";
import {
  RoleListResponseGQL,
  RoleResponseGQL,
} from "../types/responses/RoleResponseGQL";
import { RolEntity } from "@wisegar-org/wgo-opengar-core";
import { Response } from "../../models/responseModels/Response";

@Resolver()
export class RoleResolver {
  private readonly _roleDataSerive: RoleDataService;

  constructor() {
    this._roleDataSerive = new RoleDataService();
  }

  @Query(() => RoleListResponseGQL)
  async roles(@Args() criteria?: RoleFilterArgs) {
    return await this._roleDataSerive.all(criteria);
  }

  @Query(() => RoleResponseGQL)
  async role(@Args() criteria?: RoleFilterArgs) {
    return await this._roleDataSerive.one(criteria);
  }

  @Query(() => RoleResponseGQL)
  async roleById(@Arg("id") id: number) {
    return await this._roleDataSerive.oneById(id);
  }

  @Mutation(() => RoleResponseGQL)
  async addRole(
    @Arg("data") { name }: RoleInputGQL
  ): Promise<Response<RolEntity>> {
    const role = new RolEntity();
    return await this._roleDataSerive.create(role);
  }

  @Mutation(() => RoleResponseGQL)
  async updateRole(
    @Arg("data") { id, name }: RoleInputGQL
  ): Promise<Response<RolEntity>> {
    return await this._roleDataSerive.update({ id, name } as RolEntity);
  }

  @Mutation(() => RoleResponseGQL)
  async removeRole(@Arg("id") id: number): Promise<Response<RolEntity>> {
    return await this._roleDataSerive.remove(id);
  }
}
