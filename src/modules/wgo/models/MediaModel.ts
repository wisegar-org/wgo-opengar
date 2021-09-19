import { GetNodeEnvKey, MediaEntity, MediaService, MediaEntityTypeEnum } from '@wisegar-org/wgo-opengar-core';

import { join, extname, normalize } from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  ReadStream,
  mkdirSync,
  existsSync,
  createWriteStream,
  unlinkSync,
  readFileSync,
  writeFileSync,
} from 'fs-extra';
import { Repository } from 'typeorm';
import { FILES_STORAGE_FOLDER_NAME, GetPublicFilesPath } from '../settings/ConfigService';
import { GetConnection } from '../database/DBGetConnection';
import { MediaInputGQL, MediaResponseGQL } from '../modules';

export class MediaModel {
  private repository: Repository<MediaEntity>;
  constructor() {
    const conn = GetConnection();
    this.repository = conn.getRepository(MediaEntity);
  }

  static getStorageFilePath(isPublic: boolean, filename: string): string {
    const storageDir = isPublic ? GetPublicFilesPath() : GetPublicFilesPath();

    if (!existsSync(storageDir)) {
      mkdirSync(storageDir);
    }
    return join(storageDir, filename);
  }

  getRelativeStorageFilePath(isPublic: boolean, filename: string) {
    const storageDir = isPublic ? `${FILES_STORAGE_FOLDER_NAME}` : `${FILES_STORAGE_FOLDER_NAME}`;

    return join(storageDir, filename);
  }

  static getRelativeFileUrl(isPublic: boolean, filename: string) {
    if (!isPublic) return '';
    return `${FILES_STORAGE_FOLDER_NAME}/${filename}`;
  }

  static getMediaResponse(media: MediaEntity, urlApi: string) {
    return <MediaResponseGQL>{
      data: media.fileContent.toString('base64'),
      isPublic: media.isPublic,
      id: media.id,
      mimetype: media.mimeType,
      url: `${urlApi}${MediaModel.getRelativeFileUrl(media.isPublic, media.fileName)}`,
    };
  }

  getErrorMediaResponse(isPublic: boolean, error: string) {
    return <MediaResponseGQL>{
      isPublic: isPublic,
      error: error,
    };
  }

  static saveMediaFile(media: MediaEntity) {
    const filePath = normalize(MediaModel.getStorageFilePath(media.isPublic, media.fileName));
    if (!existsSync(filePath)) {
      writeFileSync(filePath, media.fileContent);
    }
    return filePath;
  }

  saveStreamFile(stream: any, filepath: string): Promise<string> {
    return new Promise((resolve, reject) =>
      stream
        .on('error', (error: any) => {
          if (stream.truncated) unlinkSync(filepath);
          reject(error);
        })
        .pipe(createWriteStream(filepath))
        .on('error', (error: any) => {
          return reject(error);
        })
        .on('finish', () => {
          return resolve(filepath);
        })
    );
  }

  async uploadFile(data: MediaInputGQL, urlApi: string): Promise<MediaResponseGQL> {
    try {
      const fileInput = await data.file;
      const { createReadStream, filename, mimetype, encoding } = fileInput as any;

      const stream: ReadStream = createReadStream();

      const storageFileUuid = uuidv4();
      const storageFileExt = extname(filename);
      const storageFileName = `${storageFileUuid}${storageFileExt}`;
      const storageFilePath = MediaModel.getStorageFilePath(data.isPublic, storageFileName);
      const storedFilePath = await this.saveStreamFile(stream, storageFilePath);
      const storedFileContent = readFileSync(storedFilePath);

      const file = this.repository.create();
      file.displayName = filename;
      file.fileContent = storedFileContent;
      file.fileExt = storageFileExt;
      file.fileName = storageFileName;
      file.isPublic = data.isPublic;
      file.mimeType = mimetype;
      file.path = this.getRelativeStorageFilePath(data.isPublic, storageFileName);
      const savedFile = await file.save();

      return MediaModel.getMediaResponse(savedFile, urlApi);
    } catch (error) {
      return this.getErrorMediaResponse(data.isPublic, error);
    }
  }

  async getMediaList(listId: number[]) {
    const result: MediaEntity[] = [];
    await Promise.all(
      listId.map(async (id) => {
        const media = await this.repository.findOne(id);
        if (media) {
          result.push(media);
        }
      })
    );
    return result;
  }
}
