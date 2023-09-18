import express, { Express } from "express";
import { existsSync, mkdirpSync } from "fs-extra";
import path from "path";

export const GetClientWebRootKey = () => {
  if (process.env.CLIENT_WEB_ROOT) return process.env.CLIENT_WEB_ROOT;
  throw "Impossible to get value from CLIENT_WEB_ROOT environment key";
};

export const GetWebRootKey = () => {
  if (process.env.APP_WEB_ROOT) return process.env.APP_WEB_ROOT;
  throw "Impossible to get value from APP_WEB_ROOT environment key";
};
export const GetHandlebarStaticsKey = () => {
  if (process.env.APP_WEB_ROOT)
    return path.join(process.env.APP_WEB_ROOT, "public");

  throw "Impossible to get value from APP_WEB_ROOT environment key";
};
export const GetHandlebarRootKey = () => {
  if (process.env.APP_WEB_ROOT)
    return path.join(process.env.APP_WEB_ROOT, "views");

  throw "Impossible to get value from APP_WEB_ROOT environment key";
};

export const UseHostAdminMiddleware = (app: Express) => {
  if (!existsSync(GetClientWebRootKey())) {
    console.error("Host client folder do not exist!");
    mkdirpSync(GetClientWebRootKey());
  }
  app.use("/wgo", express.static(GetClientWebRootKey()));
};
