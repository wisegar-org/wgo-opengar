import { NonEmptyArray } from "type-graphql";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";

import { IndexContentResolver } from "./IndexContent/IndexContentResolver";
import { FinanceIssuesResolver } from "./FinanceIssues/FinanceIssuesResolver";
import { FinanceIssuesOptionsResolver } from "./FinanceIssuesOptions/FinanceIssuesOptionsResolver";
import { CoreResolver } from "../../core";
import { AuthResolver } from "../../authentication";
import { LanguageResolver } from "../../language";
import { SettingsResolver } from "../../settings";
import { ContactMeResolver } from "../../contact";
import { TemplateResolver } from "../../template";
import { TranslationResolver } from "../../translation";
import { HistoricResolver } from "../../historic";
import { MediaResolver, StorageResolver } from "../../storage";
import { EmailResolver } from "../../email";
import { AGVEventResolver } from "../../agv/resolvers/Event/AGVEventResolver";
import { AGVContentsResolver } from "../../agv/resolvers/Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "../../agv/resolvers/Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "../../agv/resolvers/Inscription/AGVInscriptionResolver";
export * from "./Media/MediaResolver";
export * from "./Translation/TranslationResolver";
export * from "./IndexContent/IndexContentResolver";
export * from "./FinanceIssues/FinanceIssuesResolver";
export * from "./FinanceIssuesOptions/FinanceIssuesOptionsResolver";
export * from "../../core";
export * from "../../authentication";
export * from "../../language";
export * from "../../settings";
export * from "../../contact";
export * from "../../template";
export * from "../../translation";
export * from "../../historic";
export * from "../../storage";
export * from "../../email";
export * from "../../agv/resolvers/Event/AGVEventResolver";
export * from "../../agv/resolvers/Content/AGVContentsResolver";
export * from "../../agv/resolvers/Newsletter/AGVNewsletterResolver";
export * from "../../agv/resolvers/Inscription/AGVInscriptionResolver";

export const getResolvers = (resolvers?: NonEmptyArray<Function>) => {
  const defaultControllers = [
    CoreResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
    TemplateResolver,
    TranslationResolver,
    HistoricResolver,
    MediaResolver,
    EmailResolver,
    StorageResolver,
    IndexContentResolver,
    FinanceIssuesResolver,
    FinanceIssuesOptionsResolver,
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ];

  if (resolvers && resolvers.length > 0) {
    return [
      ...defaultControllers,
      ...resolvers,
    ] as unknown as NonEmptyArray<Function>;
  }
  return defaultControllers as unknown as NonEmptyArray<Function>;
};
