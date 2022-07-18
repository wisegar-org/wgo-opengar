import { DataSource } from "typeorm";
import { IGetSettingsParam } from ".";
import SettingsEntity from "../database/entities/SettingsEntity";
import { APP_SETTINGS, WRONG_TYPE } from "./constants";

export class SettingsModel {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public async getSettings(data?: IGetSettingsParam): Promise<any> {
    const repo = await this.dataSource.getRepository(SettingsEntity);
    const settings = await repo.findOne({
      where: { type: data?.type || APP_SETTINGS },
    });
    if (!settings) throw new Error(WRONG_TYPE);

    return settings?.settings || {};
  }
}
