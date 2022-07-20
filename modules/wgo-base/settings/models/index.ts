export interface IGetSettingsParam {
  type_settings?: string;
}

export interface ISetSettingsParam {
  type_settings?: string;
  key: string;
  value: any;
}

export interface ISettingsModel {
  key: string;
  type_settings: string;
  value: string;
}
