import { Resolver, Query, Mutation, Arg, Args } from 'type-graphql';
import {
  UserEntity,
  UserDataService,
  GetEmailSenderKey,
  GetEmailSenderNameKey,
  validateAccessToken,
  generateAccessToken,
  AccessTokenData,
} from '@wisegar-org/wgo-opengar-core';
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
import { UserModel } from '../models/UserModel';

@Resolver()
export class UserResolver {
  private readonly _userDataService: UserDataService;
  private readonly _userModel: UserModel;

  constructor() {
    const conn: Connection = GetConnection();
    this._userDataService = new UserDataService(conn);
    this._userModel = new UserModel(conn);
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
    data: UserInputGQL,
    @Arg('urlApi') urlApi: String
  ): Promise<Response<UserEntity>> {
    const registerResponse = await this._userModel.addUser(data, urlApi as string);
    if (registerResponse.isSuccess) {
      return registerResponse;
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
    data: UserInputGQL
  ): Promise<Response<UserEntity>> {
    const updateResp = await this._userModel.updateUser(data);
    return updateResp;
  }

  @Mutation(() => Boolean)
  async setUserLanguage(@Arg('uuid') uuid: string, @Arg('langId') langId: number) {
    return !!(await this._userDataService.setUserLanguage(uuid, langId));
  }

  @Mutation(() => UserResponseGQL)
  async removeUser(@Arg('uuid') uuid: string) {
    return await this._userDataService.remove(uuid);
  }

  @Mutation(() => Boolean!)
  async confirmUser(@Arg('token') token: string) {
    return await this._userModel.confirmUser(token);
  }

  @Mutation(() => Boolean!)
  async resendConfirmationUser(@Arg('email') email: string, @Arg('urlApi') urlApi: string) {
    return await this._userModel.resendConfirmationUser(email, urlApi);
  }
}
