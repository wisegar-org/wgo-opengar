import { Query, Resolver } from "@wisegar-org/wgo-base-server";

@Resolver()
export class AppResolver {
  @Query(() => String)
  async getVersion() {
    return "v0.0.2.2.2.2.2";
  }
}
