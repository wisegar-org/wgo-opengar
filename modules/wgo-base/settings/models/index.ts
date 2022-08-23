export interface IGetSettingsParam {
  type_settings?: string;
}

export type ISettingModelValue =
  | ISettingValueBoolean
  | ISettingValuePassword
  | ISettingValueString
  | ISettingValueNumber
  | string;
export interface ISetSettingsParam {
  type_settings?: string;
  key: string;
  value: ISettingModelValue;
}

export interface ISettingValueBoolean {
  type: 'boolean';
  value: boolean;
}

export interface ISettingValuePassword {
  type: 'password';
  value: string;
}

export interface ISettingValueString {
  type: 'string';
  value: string;
}

export interface ISettingValueNumber {
  type: 'number';
  value: number;
}

export interface ISettingsModel {
  key: string;
  type_settings: string;
  value: ISettingModelValue;
}

export interface Pop3Settings {
  POP3_EMAIL_HOST: string;
  POP3_EMAIL_PORT: number;
  POP3_EMAIL_USER: string;
  POP3_EMAIL_PASSWORD: string;
  POP3_EMAIL_EMAIL: string;
  POP3_EMAIL_TLS: boolean;
  POP3_EMAIL_DELETE: boolean;
  POP3_EMAIL_LOAD_TIME: number;
}

export interface SmtpSettings {
  SMTP_EMAIL_HOST: string;
  SMTP_EMAIL_PORT: number;
  SMTP_EMAIL_USER: string;
  SMTP_EMAIL_PASSWORD: string;
  SMTP_EMAIL_EMAIL: string;
  SMTP_EMAIL_TLS: boolean;
}
