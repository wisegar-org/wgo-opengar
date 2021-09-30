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
import SeoEntity from './database/entities/SeoEntity';
import { SeoResolver } from './modules';
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
  return [
    AppResolver,
    EmailResolver,
    MediaResolver,
    RoleResolver,
    UserResolver,
    LanguageResolver,
    TranslationResolver,
    SeoResolver,
  ];
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
    SeoEntity,
  ] as any[];
};
