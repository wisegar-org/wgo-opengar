import { cypherData, decypherData } from '@wisegar-org/wgo-opengar-core';
import { join } from 'path';

export const PUBLIC_FOLDER_NAME = 'public';
export const REPORT_STORAGE_FOLDER_NAME = 'reports';
export const APP_SERVER_NAME = 'api';
export const PUBLIC_REPORT_RELATIVE_URL = `/${REPORT_STORAGE_FOLDER_NAME}`;
export const PUBLIC_REPORT_RELATIVE_PATH = `${PUBLIC_FOLDER_NAME}/${REPORT_STORAGE_FOLDER_NAME}`;
export const PUBLIC_REPORT_APP_PATH = `/${APP_SERVER_NAME}/${REPORT_STORAGE_FOLDER_NAME}`;

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

export const GetPublicReportPath = () => {
  const APP_WEB_ROOT = GetWebRootKey();
  return join(APP_WEB_ROOT, PUBLIC_REPORT_RELATIVE_PATH);
};

export const getTokenToReport = (data: any) => {
  return cypherData(JSON.stringify(data));
};

export const getDataOfToken = (token: string) => {
  return JSON.parse(decypherData(token));
};
