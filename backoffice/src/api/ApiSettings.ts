export enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production",
}
export interface IApiSettings {
  API_BASE: string;
  API_GRAPHQL: string;
  DEFAULT_USER_PROFILE: string;
  VERSION: string;
}

import settingsBuild from "../../settings.build.json";

export const getSettings = (env: Environment): IApiSettings => {
  switch (env) {
    case Environment.Production || Environment.Staging:
      return {
        API_BASE: process.env.API_BASE,
        API_GRAPHQL: process.env.API_GRAPHQL,
        VERSION: process.env.VERSION,
        DEFAULT_USER_PROFILE: "icons/profile-user.svg",
      };
    default:
      return {
        API_BASE: settingsBuild.API_BASE,
        API_GRAPHQL: settingsBuild.API_GRAPHQL,
        VERSION: "Dev Version",
        DEFAULT_USER_PROFILE: "icons/profile-user.svg",
      };
  }
};
