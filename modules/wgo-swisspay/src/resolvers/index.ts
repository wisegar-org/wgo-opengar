import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { AuthResolver } from "./Auth/AuthResolver";

export const getResolverList = () => {
  return [AppResolver, AuthResolver] as NonEmptyArray<Function>;
};
