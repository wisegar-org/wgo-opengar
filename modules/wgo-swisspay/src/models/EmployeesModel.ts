import { UserResponse } from '@wisegar-org/wgo-base-server';
import PdfParse from 'pdf-parse';

export interface IEmployeeModel {
  id: number;
  name: string;
  email: string;
  enterprise: UserResponse;
  client: UserResponse;
  confirmed: boolean;
}

export interface IEmployeeToImportModel {
  name: string;
  lastName: string;
  email: string;
  code: string;
}

export interface IUserFilter {
  id: number;
}

export interface IEmployeeFilter {
  enterprise_id: IUserFilter;
}

export interface IRegisterEmployeeFilter {
  code: string;
  enterprise_id: IUserFilter;
}

export interface IEmployeeOptions {
  privateKey: string;
  publicKey: string;
  hostBase: string;
  tokenExpiresIn: string;
  tokenRegisterExpiresIn: string;
  emailOptions: any;
}

export interface IEmployeeDocumentProps {
  fileName: string;
  size: number;
  data: PdfParse.Result;
}
