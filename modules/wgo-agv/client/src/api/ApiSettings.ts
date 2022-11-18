export enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production",
}

const defaultEnv: Environment =
  process.env.NODE_ENV === Environment.Production
    ? Environment.Production
    : Environment.Development;

export interface IApiSettings {
  API_BASE: string;
  API_GRAPHQL: string;
  DEFAULT_USER_PROFILE: string;
  VERSION: string;
}

import settingsBuild from "../../settings.build.json";

export const getSettings = (env?: Environment): IApiSettings => {
  if (!env) env = defaultEnv;
  switch (env) {
    case Environment.Production || Environment.Staging:
      return {
        API_BASE: process.env.API_BASE + "/",
        API_GRAPHQL: process.env.API_GRAPHQL,
        VERSION: process.env.VERSION,
        DEFAULT_USER_PROFILE: "icons/profile-user.svg",
      };
    default:
      return {
        API_BASE: (settingsBuild as any).API_BASE + "/",
        API_GRAPHQL: (settingsBuild as any).API_GRAPHQL,
        VERSION: "Dev Version",
        DEFAULT_USER_PROFILE: "icons/profile-user.svg",
      };
  }
};
