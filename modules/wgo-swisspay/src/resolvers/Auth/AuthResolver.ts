import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput, MeInput } from "./AuthInputs";
import { LoginResponse, UserResponse } from "./AuthResponses";
import { AuthModel } from "../../../../wgo-base/authenticacion/models/AuthModel";
import { PostgresDataSource } from "../../../dataSources";
import { GetPrivateKey, GetPublicKey } from "@wisegar-org/wgo-settings";

@Resolver()
export class AuthResolver {
  private privateKey: string;
  private publicKey: string;

  /**
   *
   */
  constructor() {
    this.privateKey = GetPrivateKey();
    this.publicKey = GetPublicKey();
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("data") data: LoginInput) {
    const authModel = new AuthModel(
      PostgresDataSource,
      this.privateKey,
      this.publicKey
    );
    const login = await authModel.login(data);
    return login as LoginResponse;
  }

  @Query(() => UserResponse)
  async me(@Arg("data") data: MeInput) {
    const authModel = new AuthModel(
      PostgresDataSource,
      this.privateKey,
      this.publicKey
    );
    const user = await authModel.me(data);
    return user as UserResponse;
  }
}
