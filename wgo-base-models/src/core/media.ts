export interface IMediaModel {
  id: number;
  displayName: string;
  fileName: string;
  fileExt: string;
  mimeType: string;
  fileContent?: Buffer;
  data?: string;
  isPublic: boolean;
  url?: string;
}
