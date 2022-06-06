import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  LoginInput,
  MeInput,
  RegisterInput,
  ResendConfirmationInput,
} from "./AuthInputs";
import { LoginResponse, UserResponse } from "./AuthResponses";
import { AuthModel } from "../../../../wgo-base/authenticacion/models/AuthModel";
import { IAuthModelArg } from "../../../../wgo-base/authenticacion/models";
import { PostgresDataSource } from "../../../dataSources";
import {
  GetEmailAppAddressKey,
  GetExpiresInKey,
  GetHostBaseKey,
  GetPrivateKey,
  GetPublicKey,
} from "@wisegar-org/wgo-settings";

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
      tokenRegisterExpiresIn: "24h",
      emailOptions: { from: GetEmailAppAddressKey() } as any,
    };
    debugger;
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("data") data: LoginInput) {
    const authModel = new AuthModel(this.options);
    const login = await authModel.login(data);
    return login as LoginResponse;
  }

  @Query(() => UserResponse)
  async me(@Arg("data") data: MeInput) {
    const authModel = new AuthModel(this.options);
    const user = await authModel.me(data);
    return user as UserResponse;
  }

  @Mutation(() => UserResponse)
  async register(@Arg("data") data: RegisterInput) {
    const authModel = new AuthModel(this.options);
    const login = await authModel.register(data as any);
    return login;
  }

  @Mutation(() => Boolean)
  async resendConfirmation(@Arg("data") data: ResendConfirmationInput) {
    const authModel = new AuthModel(this.options);
    const user = await authModel.resendConfirmation(data);
    return !!user;
  }

  @Mutation(() => Boolean)
  async confirmRegist(@Arg("data") data: MeInput) {
    const authModel = new AuthModel(this.options);
    const user = await authModel.confirmRegist(data);
    return !!user;
  }
}
