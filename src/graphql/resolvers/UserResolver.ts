import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { UserEntity } from "@wisegar-org/wgo-opengar-core";
import {
  UserResponseGQL,
  UserListResponseGQL,
  UserLoginResponseGQL,
  UserLoginToken,
} from "../types/responses/UserResponsesGQL";
import { ErrorResponse, Response } from "../../models/responseModels/Response";
import { UserDataService } from "../../services/data-services/UserDataService";
import {
  LoginModelInputGQL,
  UserFilterArgs,
  UserInputGQL,
  UserRolesInputGQL,
} from "../types/inputs/UserInputsGQL";
import * as _ from "lodash";
import { Inject, Service } from "typedi";
import Container from "typedi";

@Service()
@Resolver()
export class UserResolver {
  @Inject()
  private readonly _userDataSerive: UserDataService;

  constructor() {
    this._userDataSerive = Container.get(UserDataService);
  }

  @Query(() => UserListResponseGQL)
  async users(@Args() criteria?: UserFilterArgs) {
    return await this._userDataSerive.all(criteria);
  }

  @Query(() => UserResponseGQL)
  async user(@Args() criteria?: UserFilterArgs) {
    return await this._userDataSerive.one(criteria);
  }

  @Query(() => UserResponseGQL)
  async userById(@Arg("id") id: number) {
    return await this._userDataSerive.oneById(id);
  }

  @Query(() => UserResponseGQL)
  async userByUuid(@Arg("uuid") uuid: string) {
    return await this._userDataSerive.oneByUuId(uuid);
  }

  //In roles arg we have the roleIds we want to set to the user we are creating
  @Mutation(() => UserResponseGQL)
  async addUser(
    @Arg("data")
    { name, lastName, email, userName, password, roles }: UserInputGQL
  ): Promise<Response<UserEntity>> {
    const user = new UserEntity();
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.userName = userName;
    user.password = password;
    const registerResponse = await this._userDataSerive.create(user);
    if (registerResponse.isSuccess) {
      const uuid = registerResponse.result.uuid;
      const result = await this._userDataSerive.setUserRoles(uuid, roles);
      if (result.isSuccess) {
        return registerResponse;
      }
      return ErrorResponse.Response(
        "Error adding roles to user but user was created"
      );
    }
    return ErrorResponse.Response("Error creating user");
  }

  @Mutation(() => UserResponseGQL)
  async setRoles(
    @Arg("data") { userUuid, roleIds }: UserRolesInputGQL
  ): Promise<Response<UserEntity>> {
    return this._userDataSerive.setUserRoles(userUuid, roleIds);
  }

  @Mutation(() => UserLoginResponseGQL)
  async login(
    @Arg("data") data: LoginModelInputGQL
  ): Promise<Response<UserLoginToken>> {
    return this._userDataSerive.login(data);
  }

  @Mutation(() => UserResponseGQL)
  async updateUser(
    @Arg("data") { id, name, lastName, email, userName, roles }: UserInputGQL
  ): Promise<Response<UserEntity>> {
    const userResponse = await this.userById(id);
    if (!userResponse.isSuccess) {
      return ErrorResponse.Response(
        `Error trying to update user.User not found with id:${id}`
      );
    }
    const user = userResponse.result;
    user.name = name ? name : user.name;
    user.lastName = lastName ? lastName : user.lastName;
    user.email = email ? email : user.email;
    user.userName = userName ? userName : user.userName;
    const updateResp = await this._userDataSerive.update(user);
    if (!updateResp.isSuccess) {
      return ErrorResponse.Response(`Error trying to update user.`);
    }

    if (_.isUndefined(roles) || !_.isArray<number>(roles)) {
      return updateResp;
    }
    return await this._userDataSerive.setUserRoles(user.uuid, roles);
  }

  @Mutation(() => UserResponseGQL)
  async removeUser(@Arg("uuid") uuid: string) {
    return await this._userDataSerive.remove(uuid);
  }
}
