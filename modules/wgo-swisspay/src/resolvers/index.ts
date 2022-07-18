import { NonEmptyArray } from 'type-graphql';
import { AppResolver } from './AppResolver';
import { AuthResolver } from './Auth/AuthResolver';
import { EmailMediaResolver } from './EmailMedia/EmailMediaResolver';
import { EmployeesResolver } from './Employees/EmployeesResolver';
import { LanguageResolver } from './Language/LanguageResolver';
import { TranslationResolver } from './Translation/TranslationResolver';

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    EmailMediaResolver,
    EmployeesResolver,
    LanguageResolver,
    TranslationResolver,
  ] as NonEmptyArray<Function>;
};
