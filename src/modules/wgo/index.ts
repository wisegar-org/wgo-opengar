export { SeederWGO } from './seeder';
export { ServerAuthenticator, ServerContext } from './servers';
export { HostClientMiddleware } from './middlewares/HostClientMiddleware';
export * from './settings';

import {
  LanguageEntity,
  MediaEntity,
  RolEntity,
  SessionEntity,
  TemplateEntity,
  TranslationEntity,
  UserEntity,
} from '@wisegar-org/wgo-opengar-core';
import {
  AppResolver,
  EmailResolver,
  LanguageResolver,
  MediaResolver,
  RoleResolver,
  UserResolver,
  TranslationResolver,
} from './resolvers';

export const getWGOResolvers = () => {
  return [AppResolver, EmailResolver, MediaResolver, RoleResolver, UserResolver, LanguageResolver, TranslationResolver];
};

export const getWGOEntities = () => {
  return [
    MediaEntity,
    UserEntity,
    RolEntity,
    TemplateEntity,
    TranslationEntity,
    SessionEntity,
    LanguageEntity,
  ] as any[];
};
