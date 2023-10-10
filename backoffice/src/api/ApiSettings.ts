export enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production",
}
export interface IApiSettings {
  WEB_API: string;
  WEB_API_GRAPHQL: string;
  DEFAULT_USER_PROFILE: string;
  VERSION: string;
}

export const getSettings = (node_env: string): IApiSettings => {
  console.log("getSettings node_en param: ", node_env);
  console.log("getSettings: ", process.env);
  return {
    WEB_API: process.env.WEB_API || "http://localhost:5056",
    WEB_API_GRAPHQL:
      process.env.WEB_API_GRAPHQL || "http://localhost:5056/graphql",
    VERSION: process.env.VERSION || "0.0.0",
    DEFAULT_USER_PROFILE: "icons/profile-user.svg",
  };
};
