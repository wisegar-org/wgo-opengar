import {
  MediaEntity,
  UserEntity,
  RolEntity,
  TemplateEntity,
  TranslationEntity,
  SessionEntity,
} from '@wisegar-org/wgo-opengar-core';
import { AGV_MODULE, getAGVEntities } from '../modules/agv';
import { ALBANI_MODULE, getAlbaniEntities } from '../modules/albani';
import { FINANCE_MODULE, getFinanceEntities } from '../modules/finance';
import { BuildSettings } from '../settings/BuildSettings';

export const CoreEntities = [MediaEntity, UserEntity, RolEntity, TemplateEntity, TranslationEntity, SessionEntity];

const buildConfig = new BuildSettings();
let entities: any[] = CoreEntities;
entities = entities.concat(buildConfig.isModuleInConfig(FINANCE_MODULE) ? getFinanceEntities() : []);
entities = entities.concat(buildConfig.isModuleInConfig(AGV_MODULE) ? getAGVEntities() : []);
entities = entities.concat(buildConfig.isModuleInConfig(ALBANI_MODULE) ? getAlbaniEntities() : []);

export const BuildEntities = entities;
