export interface IBuildJson {
  MODULES: string;
}

export class BuildSettings {
  private listModules: string;

  constructor() {
    this.listModules = process.env.MODULES;
  }

  public isModuleInConfig(module: string) {
    return this.listModules.indexOf(module) !== -1;
  }
}
