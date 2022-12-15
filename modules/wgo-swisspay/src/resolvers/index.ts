import { NonEmptyArray } from 'type-graphql';
import { AuthResolver, LanguageResolver, SettingsResolver } from '@wisegar-org/wgo-base-server';
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
