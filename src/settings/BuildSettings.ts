import { readJsonSync } from 'fs-extra';
import { normalize, join } from 'path';

export interface IBuildJson {
  MODULES: string;
}

export class BuildSettings {
  private listModules: string;
  private buildJson: IBuildJson;
  private buildJsonPath: string;

  constructor() {
    this.buildJsonPath = normalize(join(process.env.APP_WEB_ROOT, 'settings.build.json'));
    this.buildJson = readJsonSync(this.buildJsonPath, { throws: false }) || { MODULES: 'finance' };
    this.listModules = this.buildJson.MODULES;
  }

  public isModuleInConfig(module: string) {
    return this.listModules.indexOf(module) !== -1;
  }
}
