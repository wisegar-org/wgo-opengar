import { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./AppResolver";
import { PublicMediaResolver } from "./Media/MediaResolver";
import { PublicTranslationResolver } from "./Translation/TranslationResolver";
import { AGVEventResolver } from "./Event/AGVEventResolver";
import { AGVContentsResolver } from "./Content/AGVContentsResolver";
import { AGVNewsletterResolver } from "./Newsletter/AGVNewsletterResolver";
import { AGVInscriptionResolver } from "./Inscription/AGVInscriptionResolver";
import {
  CoreResolver,
  AuthResolver,
  LanguageResolver,
  SettingsResolver,
  ContactMeResolver,
  TemplateResolver,
  HistoricResolver,
  TranslationResolver,
} from "@wisegar-org/wgo-base-server";
import { EmailResolver } from "../models/email";

export const getResolverList = () => {
  return [
    AppResolver,
    CoreResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    PublicMediaResolver,
    ContactMeResolver,
    TemplateResolver,
    HistoricResolver,
    TranslationResolver,
    EmailResolver,
    AGVEventResolver,
    AGVContentsResolver,
    AGVNewsletterResolver,
    AGVInscriptionResolver,
  ] as NonEmptyArray<Function>;
};
