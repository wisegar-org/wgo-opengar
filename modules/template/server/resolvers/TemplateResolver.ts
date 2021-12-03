import { Query, Resolver } from "type-graphql";

@Resolver()
export class TemplateResolver {
  @Query(() => [])
  async getTemplate() {
    return [];
  }
}
