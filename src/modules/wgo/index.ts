export { SeederWGO } from './seeder';
export { ServerAuthenticator, ServerContext } from './servers';
export { HostClientMiddleware } from './middlewares/HostClientMiddleware';
export * from './settings';

import { MediaEntity, RolEntity, SessionEntity, TemplateEntity, UserEntity } from '@wisegar-org/wgo-opengar-core';
import { LanguageEntity } from './database/entities/LanguageEntity';
import TranslationEntity from './database/entities/TranslationEntity';
import { AppResolver, EmailResolver, LanguageResolver, MediaResolver, RoleResolver, UserResolver } from './resolvers';

export const getWGOResolvers = () => {
  return [AppResolver, EmailResolver, MediaResolver, RoleResolver, UserResolver, LanguageResolver];
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
