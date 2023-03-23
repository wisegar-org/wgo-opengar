import { NonEmptyArray } from 'type-graphql';
import {
  CoreResolver,
  EmailResolver,
  AuthResolver,
  LanguageResolver,
  SettingsResolver,
  ContactMeResolver,
  TemplateResolver,
  HistoricResolver,
} from '@wisegar-org/wgo-base-server';
import { PublicTranslationResolver } from './Translations/TranslationResolver';
import { AppResolver } from './AppResolver';
import { EmailMediaResolver } from './EmailMedia/EmailMediaResolver';
import { EmployeesResolver } from './Employees/EmployeesResolver';
import { PublicMediaResolver } from './Media/MediaResolver';

export const getResolverList = () => {
  return [
    AppResolver,
    CoreResolver,
    EmailResolver,
    TemplateResolver,
    HistoricResolver,
    ContactMeResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    EmailMediaResolver,
    EmployeesResolver,
    PublicMediaResolver,
  ] as NonEmptyArray<Function>;
};
