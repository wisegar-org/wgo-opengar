import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { PostgresDataSource } from '../../../dataSources';
import { DataSource } from 'typeorm';
import { SettingsResponse } from './SettingsResolvers';
import { SETTINGS_PATH_GET_ALL_SETTINGS, SETTINGS_PATH_SET_SETTING } from '../../../../wgo-base/settings/router/server';
import { SettingsModel } from '../../../../wgo-base/settings/models/SettingsModel';
import { PostSettingInput } from './SettingsInputs';

@Resolver()
export class SettingsResolver {
  private dataSource: DataSource;

  /**
   *
   */
  constructor() {
    this.dataSource = PostgresDataSource;
  }

  @Authorized()
  @Query(() => [SettingsResponse], { name: SETTINGS_PATH_GET_ALL_SETTINGS })
  async getAllSettings() {
    const emailMediaModel = new SettingsModel(this.dataSource);
    const emails = await emailMediaModel.getAllSettingsList();
    return emails as SettingsResponse[];
  }

  @Authorized()
  @Mutation(() => Boolean, { name: SETTINGS_PATH_SET_SETTING })
  async setSetting(@Arg('data') data: PostSettingInput) {
    const emailMediaModel = new SettingsModel(this.dataSource);
    const result = await emailMediaModel.setSettings(data);
    return result;
  }
}
