import { NonEmptyArray } from 'type-graphql';
import { AuthResolver } from '../wgo-base/authentication/resolvers/AuthResolver';
import { LanguageResolver } from '../wgo-base/language/resolvers/LanguageResolver';
import { SettingsResolver } from '../wgo-base/settings/resolvers/SettingsResolver';
import { PublicTranslationResolver } from './Translations/TranslationResolver';
import { AppResolver } from './AppResolver';
import { EmailMediaResolver } from './EmailMedia/EmailMediaResolver';
import { EmployeesResolver } from './Employees/EmployeesResolver';

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    LanguageResolver,
    PublicTranslationResolver,
    SettingsResolver,
    EmailMediaResolver,
    EmployeesResolver,
  ] as NonEmptyArray<Function>;
};
