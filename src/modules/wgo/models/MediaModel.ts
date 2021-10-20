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
import { GetConnection } from '../database/DBGetConnection';
import { MediaInputGQL, MediaResponseGQL, MediasInputGQL } from '../modules';
import { FILES_STORAGE_FOLDER_NAME, GetPrivateFilesPath, GetPublicFilesPath } from '../settings/ConfigService';

export class MediaModel {
  private repository: Repository<MediaEntity>;
  constructor() {
    const conn = GetConnection();
    this.repository = conn.getRepository(MediaEntity);
  }

  static getStorageFilePath(isPublic: boolean, filename: string): string {
    const storageDir = isPublic ? GetPublicFilesPath() : GetPrivateFilesPath();

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
    if (media.isPublic) MediaModel.saveMediaFile(media);
    return <MediaResponseGQL>{
      isPublic: media.isPublic,
      id: media.id,
      mimetype: media.mimeType,
      displayName: media.displayName,
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
    return this.saveMediaInPath(media, filePath);
  }

  static saveMediaInPath(media: MediaEntity, filePath: string, replace = false) {
    if (!existsSync(filePath) || replace) {
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

      const file = this.repository.create();
      return this.saveFile(file, stream, filename, storageFileUuid, storageFileExt, mimetype, data.isPublic, urlApi);
    } catch (error) {
      return this.getErrorMediaResponse(data.isPublic, error);
    }
  }

  async uploadFavicon(data: MediaInputGQL, urlApi: string): Promise<MediaResponseGQL> {
    try {
      const storageFileUuid = 'favicon';
      const storageFileExt = '.ico';
      const storageFileName = `${storageFileUuid}${storageFileExt}`;
      let media = await this.repository.findOne({
        where: {
          fileName: storageFileName,
        },
      });
      if (!media) {
        media = this.repository.create();
      }

      const fileInput = await data.file;
      const { createReadStream, mimetype } = fileInput as any;
      const stream: ReadStream = createReadStream();

      return this.saveFile(
        media,
        stream,
        storageFileName,
        storageFileUuid,
        storageFileExt,
        mimetype,
        data.isPublic,
        urlApi
      );
    } catch (error) {
      return this.getErrorMediaResponse(data.isPublic, error);
    }
  }

  async saveFile(
    file: MediaEntity,
    stream: ReadStream,
    filename: string,
    storageFileUuid: string,
    storageFileExt: string,
    mimetype: string,
    isPublic: boolean,
    urlApi: string
  ): Promise<MediaResponseGQL> {
    try {
      const storageFileName = `${storageFileUuid}${storageFileExt}`;
      const storageFilePath = MediaModel.getStorageFilePath(isPublic, storageFileName);
      const storedFilePath = await this.saveStreamFile(stream, storageFilePath);
      const storedFileContent = readFileSync(storedFilePath);

      file.displayName = filename;
      file.fileContent = storedFileContent;
      file.fileExt = storageFileExt;
      file.fileName = storageFileName;
      file.isPublic = isPublic;
      file.mimeType = mimetype;
      file.path = this.getRelativeStorageFilePath(isPublic, storageFileName);
      const savedFile = await file.save();

      return MediaModel.getMediaResponse(savedFile, urlApi);
    } catch (error) {
      return this.getErrorMediaResponse(isPublic, error);
    }
  }

  async uploadFiles(data: MediasInputGQL, urlApi: string): Promise<MediaResponseGQL[]> {
    const result: MediaResponseGQL[] = [];
    for (const fileItem of data.files) {
      const media = await this.uploadFile(fileItem, urlApi);
      if (!media.error) result.push(media);
    }
    return result;
  }

  async getFile(id: number) {
    const media = await this.repository.findOne(id);
    return <MediaResponseGQL>{
      mimetype: media.mimeType,
      data: media.fileContent.toString('base64'),
    };
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
