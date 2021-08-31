import {
  MediaEntity,
  UserEntity,
  RolEntity,
  TemplateEntity,
  TranslationEntity,
  SessionEntity,
} from '@wisegar-org/wgo-opengar-core';
import { AGV_MODULE, getAGVEntities } from '../modules/agv';
import { FINANCE_MODULE, getFinanceEntities } from '../modules/finance';
import { BuildSettings } from '../settings/BuildSettings';

export const CoreEntities = [MediaEntity, UserEntity, RolEntity, TemplateEntity, TranslationEntity, SessionEntity];

const buildConfig = new BuildSettings();
const entities: any[] = CoreEntities.concat(
  buildConfig.isModuleInConfig(FINANCE_MODULE) ? getFinanceEntities() : []
).concat(buildConfig.isModuleInConfig(AGV_MODULE) ? getAGVEntities() : []);

export const BuildEntities = entities;
