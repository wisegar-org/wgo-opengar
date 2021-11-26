import { mkdirSync, existsSync } from 'fs-extra';
import { join } from 'path';

export const PUBLIC_FOLDER_NAME = 'public';
export const PRIVATE_FOLDER_NAME = 'private';
export const FILES_STORAGE_FOLDER_NAME = 'files';
export const CLIENT_FOLDER_NAME = 'client';
export const APP_SERVER_NAME = 'api';
export const PUBLIC_FILES_APP_PATH = `/${APP_SERVER_NAME}/${FILES_STORAGE_FOLDER_NAME}`;

export const GetWebRootKey = () => {
  if (process.env.APP_WEB_ROOT) return process.env.APP_WEB_ROOT;
  throw 'Impossible to get value from APP_WEB_ROOT environment key';
};
export const GetPackageJsonKey = () => {
  const APP_WEB_ROOT = GetWebRootKey();
  return join(APP_WEB_ROOT, 'package.json');
};

export const GetPublicPathKey = () => {
  const APP_WEB_ROOT = GetWebRootKey();
  return join(APP_WEB_ROOT, PUBLIC_FOLDER_NAME);
};

export const GetPrivatePathKey = () => {
  const APP_WEB_ROOT = GetWebRootKey();
  return join(APP_WEB_ROOT, PRIVATE_FOLDER_NAME);
};

export const GetClientFilesPath = () => {
  const APP_WEB_ROOT = GetWebRootKey();
  return join(APP_WEB_ROOT, CLIENT_FOLDER_NAME);
};

export const GetPublicFilesPath = () => {
  const pathPublic = GetPublicPathKey();
  return join(pathPublic, FILES_STORAGE_FOLDER_NAME);
};

export const GetPrivateFilesPath = () => {
  const pathPrivate = GetPrivatePathKey();
  return join(pathPrivate, FILES_STORAGE_FOLDER_NAME);
};

export const CreatePublicPath = () => {
  const path = GetPublicPathKey();
  createDir(path, `Create public folder`);
  return path;
};

export const CreatePrivatePath = () => {
  const path = GetPrivatePathKey();
  createDir(path, `Create private folder`);
  return path;
};

export const CreatePathInPublicFolder = (path: string) => {
  const publicPath = CreatePublicPath();
  return createDir(join(publicPath, path), `Create '${path}' in public folder`);
};

export const CreatePathInPrivateFolder = (path: string) => {
  const privatePath = CreatePrivatePath();
  return createDir(join(privatePath, path), `Create '${path}' in private folder`);
};

export const CreatePath = (path: string) => {
  return createDir(path);
};

const createDir = (path: string, description?: string) => {
  if (!existsSync(path)) {
    mkdirSync(path);
    if (description) console.log(description);
  }
  return path;
};
