import { cypherData, decypherData } from '@wisegar-org/wgo-opengar-core';
import { join } from 'path';

export const PUBLIC_FOLDER_NAME = 'public';
export const PRIVATE_FOLDER_NAME = 'private';
export const FILES_STORAGE_FOLDER_NAME = 'files';
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

export const GetPublicFilesPath = () => {
  const pathPublic = GetPublicPathKey();
  return join(pathPublic, FILES_STORAGE_FOLDER_NAME);
};

export const GetPrivateFilesPath = () => {
  const pathPrivate = GetPrivatePathKey();
  return join(pathPrivate, FILES_STORAGE_FOLDER_NAME);
};
