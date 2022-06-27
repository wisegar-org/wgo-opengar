import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
  EditUserInput,
  LoginInput,
  MeInput,
  RegisterInput,
  ResendConfirmationInput,
  ResetPasswordInput,
} from './AuthInputs';
import { LoginResponse, UserResponse } from './AuthResponses';
import { AuthModel } from '../../../../wgo-base/authentication/models/AuthModel';
import { IAuthModelArg } from '../../../../wgo-base/authentication/models';
import {
  AUTH_PATH_CHANGE_RESET_PASSWORD,
  AUTH_PATH_CONFIRM_REGIST,
  AUTH_PATH_EDIT_USER,
  AUTH_PATH_LOGIN,
  AUTH_PATH_ME,
  AUTH_PATH_REGISTER,
  AUTH_PATH_RESEND_CONFIRMATION,
  AUTH_PATH_RESET_PASSWORD,
} from '../../../../wgo-base/authentication/router/server';
import { PostgresDataSource } from '../../../dataSources';
import {
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from '@wisegar-org/wgo-settings';

@Resolver()
export class AuthResolver {
  private options: IAuthModelArg;

  /**
   *
   */
  constructor() {
    this.options = {
      privateKey: GetPrivateKey(),
      publicKey: GetPublicKey(),
      hostBase: GetHostBaseKey(),
      dataSource: PostgresDataSource,
      tokenExpiresIn: GetExpiresInKey(),
      tokenRegisterExpiresIn: '24h',
      emailOptions: { from: GetEmailAppAddressKey() } as any,
    };
  }

  @Mutation(() => LoginResponse, { name: AUTH_PATH_LOGIN })
  async login(@Arg('data') data: LoginInput) {
    const authModel = new AuthModel(this.options);
    const login = await authModel.login(data);
    return login as LoginResponse;
  }

  @Query(() => UserResponse, { name: AUTH_PATH_ME })
  async me(@Arg('data') data: MeInput) {
    const authModel = new AuthModel(this.options);
    const user = await authModel.me(data);
    return user as UserResponse;
  }

  @Mutation(() => UserResponse, { name: AUTH_PATH_REGISTER })
  async register(@Arg('data') data: RegisterInput) {
    const authModel = new AuthModel(this.options);
    const user = await authModel.register(data as any);
    return user;
  }

  @Mutation(() => UserResponse, { name: AUTH_PATH_EDIT_USER })
  async editUser(@Arg('data') data: EditUserInput) {
    const authModel = new AuthModel(this.options);
    const user = await authModel.editUser(data as any);
    return user;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_RESEND_CONFIRMATION })
  async resendConfirmation(@Arg('data') data: ResendConfirmationInput) {
    const authModel = new AuthModel(this.options);
    const user = await authModel.resendConfirmation(data);
    return !!user;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_RESET_PASSWORD })
  async resetPassword(@Arg('data') data: ResendConfirmationInput) {
    const authModel = new AuthModel(this.options);
    const resetResult = await authModel.resetPassword(data);
    return !!resetResult;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_CHANGE_RESET_PASSWORD })
  async changeResetPassword(@Arg('data') data: ResetPasswordInput) {
    const authModel = new AuthModel(this.options);
    const resetResult = await authModel.changePassword(data);
    return resetResult;
  }

  @Mutation(() => Boolean, { name: AUTH_PATH_CONFIRM_REGIST })
  async confirmRegist(@Arg('data') data: MeInput) {
    const authModel = new AuthModel(this.options);
    const user = await authModel.confirmRegist(data);
    return !!user;
  }
}
