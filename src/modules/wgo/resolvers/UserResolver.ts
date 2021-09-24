import { Resolver, Query, Mutation, Arg, Args } from 'type-graphql';
import { UserEntity, UserDataService } from '@wisegar-org/wgo-opengar-core';
import { ErrorResponse, Response } from '../models/responseModels/Response';
import * as _ from 'lodash';
import {
  LoginModelInputGQL,
  UserFilterArgs,
  UserInputGQL,
  UserListResponseGQL,
  UserLoginResponseGQL,
  UserLoginToken,
  UserResponseGQL,
  UserRolesInputGQL,
} from '../modules';
import { Connection } from 'typeorm';
import { GetConnection } from '../database';

@Resolver()
export class UserResolver {
  private readonly _userDataService: UserDataService;

  constructor() {
    const conn: Connection = GetConnection();
    this._userDataService = new UserDataService(conn);
  }

  @Query(() => UserListResponseGQL)
  async users(@Args() criteria?: UserFilterArgs) {
    return await this._userDataService.all(criteria);
  }

  @Query(() => UserResponseGQL)
  async user(@Args() criteria?: UserFilterArgs) {
    return await this._userDataService.one(criteria);
  }

  @Query(() => UserResponseGQL)
  async userById(@Arg('id') id: number) {
    return await this._userDataService.oneById(id);
  }

  @Query(() => UserResponseGQL)
  async userByUuid(@Arg('uuid') uuid: string) {
    return await this._userDataService.oneByUuId(uuid);
  }

  //In roles arg we have the roleIds we want to set to the user we are creating
  @Mutation(() => UserResponseGQL)
  async addUser(
    @Arg('data')
    { name, lastName, email, userName, password, roles, isEmailConfirmed }: UserInputGQL
  ): Promise<Response<UserEntity>> {
    const user = new UserEntity();
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.userName = userName;
    user.password = password;
    user.isEmailConfirmed = isEmailConfirmed;
    const registerResponse = await this._userDataService.create(user);
    if (registerResponse.isSuccess) {
      const uuid = registerResponse.result.uuid;
      const result = await this._userDataService.setUserRoles(uuid, roles);
      if (result.isSuccess) {
        return registerResponse;
      }
      return ErrorResponse.Response('Error adding roles to user but user was created');
    }
    return ErrorResponse.Response('Error creating user');
  }

  @Mutation(() => UserResponseGQL)
  async setRoles(@Arg('data') { userUuid, roleIds }: UserRolesInputGQL): Promise<Response<UserEntity>> {
    return this._userDataService.setUserRoles(userUuid, roleIds);
  }

  @Mutation(() => UserLoginResponseGQL)
  async login(@Arg('data') data: LoginModelInputGQL): Promise<Response<UserLoginToken>> {
    return this._userDataService.login(data);
  }

  @Mutation(() => UserResponseGQL)
  async updateUser(
    @Arg('data')
    { id, name, lastName, email, userName, roles, password, isEmailConfirmed }: UserInputGQL
  ): Promise<Response<UserEntity>> {
    const userResponse = await this.userById(id);
    if (!userResponse.isSuccess) {
      return ErrorResponse.Response(`Error trying to update user.User not found with id:${id}`);
    }
    const user = userResponse.result;
    user.name = name ? name : user.name;
    user.lastName = lastName ? lastName : user.lastName;
    user.email = email ? email : user.email;
    user.userName = userName ? userName : user.userName;
    user.isEmailConfirmed = isEmailConfirmed != null ? isEmailConfirmed : user.isEmailConfirmed;
    let updateResp = await this._userDataService.update(user);

    if (updateResp.isSuccess && password) {
      updateResp = await this._userDataService.updatePassword(user.uuid, password);
    }

    if (!updateResp.isSuccess) {
      return ErrorResponse.Response(`Error trying to update user.`);
    }

    if (_.isUndefined(roles) || !_.isArray<number>(roles)) {
      return updateResp;
    }
    return await this._userDataService.setUserRoles(user.uuid, roles);
  }

  @Mutation(() => Boolean)
  async setUserLanguage(@Arg('uuid') uuid: string, @Arg('langId') langId: number) {
    return !!(await this._userDataService.setUserLanguage(uuid, langId));
  }

  @Mutation(() => UserResponseGQL)
  async removeUser(@Arg('uuid') uuid: string) {
    return await this._userDataService.remove(uuid);
  }
}
