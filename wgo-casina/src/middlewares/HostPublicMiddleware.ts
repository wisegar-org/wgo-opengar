import { Express, static as expressStatics } from "express";
import { existsSync, mkdirpSync } from "fs-extra";
import { join } from "path";
import { GetWebRootKey } from "./HostClientMiddleware";
import { MEDIA_FILES_PATH } from "@wisegar-org/wgo-base-models";

const createDir = (path: string, description?: string) => {
  if (!existsSync(path)) {
    mkdirpSync(path);
    if (description) console.log(description);
  }
  return path;
};

export const UsePublicHostMiddleware = (App: Express) => {
  const public_path = createDir(join(GetWebRootKey(), "public"));
  const path = createDir(
    join(public_path, MEDIA_FILES_PATH),
    "Host client folder do not exist!"
  );
  App.use(`/${MEDIA_FILES_PATH}`, expressStatics(path));
};
