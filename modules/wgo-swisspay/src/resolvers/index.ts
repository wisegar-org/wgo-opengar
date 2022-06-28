import { NonEmptyArray } from 'type-graphql';
import { AppResolver } from './AppResolver';
import { AuthResolver } from './Auth/AuthResolver';
import { EmailMediaResolver } from './EmailMedia/EmailMediaResolver';
import { LanguageResolver } from './Language/LanguageResolver';

export const getResolverList = () => {
  return [AppResolver, AuthResolver, EmailMediaResolver, LanguageResolver] as NonEmptyArray<Function>;
};
