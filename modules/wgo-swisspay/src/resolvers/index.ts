import { NonEmptyArray } from 'type-graphql';
import { AppResolver } from './AppResolver';
import { AuthResolver } from './Auth/AuthResolver';
import { EmailMediaResolver } from './EmailMedia/EmailMediaResolver';
import { LanguageResolver } from './Language/LanguageResolver';
import { TranslationResolver } from './Translation/TranslationResolver';

export const getResolverList = () => {
  return [
    AppResolver,
    AuthResolver,
    EmailMediaResolver,
    LanguageResolver,
    TranslationResolver,
  ] as NonEmptyArray<Function>;
};
