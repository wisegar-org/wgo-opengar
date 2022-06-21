import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { AuthResolver } from "./Auth/AuthResolver";
import { EmailMediaResolver } from "./EmailMedia/EmailMediaResolver";

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    EmailMediaResolver,
  ] as NonEmptyArray<Function>;
};
