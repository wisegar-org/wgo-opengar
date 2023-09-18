import { MediaResolver } from "@wisegar-org/wgo-base-server";
import { AGVContentsResolver } from "./resolvers/Content/AGVContentsResolver";
import { AGVEventResolver } from "./resolvers/Event/AGVEventResolver";
import { AGVInscriptionResolver } from "./resolvers/Inscription/AGVInscriptionResolver";
import { NonEmptyArray } from "type-graphql";
import { AGVNewsletterResolver } from "./resolvers/Newsletter/AGVNewsletterResolver";

export const getAGVResolvers = () => {
  return [
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as NonEmptyArray<Function>;
};
