import { join, normalize, dirname } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs-extra';
import { JSDOM } from 'jsdom';
import { Connection, Repository } from 'typeorm';
import SeoEntity from '../../database/entities/SeoEntity';
import { GetWebRootKey } from '../../settings/ConfigService';
import { MediaResponseGQL } from '..';
import { MediaEntity } from '@wisegar-org/wgo-opengar-core';
import { FaviconName, FaviconTempName, MediaModel } from '../../models/MediaModel';

export interface IMetaProps {
  name: string;
  property: string;
  content: string;
  type: string;
}

export interface IMeta {
  [key: string]: IMetaProps;
}

export interface ISeo {
  module: string;
  path: string;
  meta: IMetaProps[];
  favicon: MediaResponseGQL | null;
}

export class SeoModel {
  seoRepository: Repository<SeoEntity>;
  mediaRespository: Repository<MediaEntity>;
  /**
   *
   */
  constructor(conn: Connection) {
    this.seoRepository = conn.getRepository(SeoEntity);
    this.mediaRespository = conn.getRepository(MediaEntity);
  }

  async getSeoEntity(): Promise<SeoEntity> {
    const module = process.env.MODULES;
    let seoModule = await this.seoRepository.findOne({
      where: {
        module: module,
      },
    });
    if (!seoModule) {
      seoModule = new SeoEntity();
      seoModule.module = module;
      seoModule.meta = {};
      seoModule = await this.seoRepository.manager.save(seoModule);
    }
    return seoModule;
  }

  async getSeoData(urlApi = ''): Promise<ISeo> {
    await this.removeTempFavicon();
    const seoModule = await this.getSeoEntity();
    const meta = this.parseEntityMetaToISeoMeta(seoModule);
    const favicon = await this.mediaRespository.findOne({
      where: { fileName: 'favicon.ico' },
    });
    return {
      module: seoModule.module,
      path: seoModule.path,
      meta: meta,
      favicon: favicon ? MediaModel.getMediaResponse(favicon, urlApi, true) : null,
    };
  }

  async setSeoData(seoData: ISeo): Promise<boolean> {
    let seoModule = await this.seoRepository.findOne({ where: { module: seoData.module } });
    if (!seoModule) {
      seoModule = new SeoEntity();
      seoModule.module = seoData.module;
    }
    seoModule.path = seoData.path;
    const meta = this.parseISeoMetaToEntityMeta(seoData);
    seoModule.meta = meta;
    const result = !!(await this.seoRepository.manager.save(seoModule));
    seoData.meta = seoData.meta;
    this.setSeoInFile(seoData);
    await this.saveTempFavicon();
    await this.setFaviconInFile(seoModule.path);
    return result;
  }

  async setSeoMeta(seoMeta: IMetaProps) {
    let seoModule = await this.getSeoEntity();
    seoModule.meta[seoMeta.name || seoMeta.property].content = seoMeta.content;
    await this.seoRepository.manager.save(seoModule);
    this.setSeoInFile(<ISeo>{ meta: [seoMeta], path: seoModule.path });
    await this.setFaviconInFile(seoModule.path);
  }

  async setFaviconInFile(seoPath: string) {
    const favicon = await this.mediaRespository.findOne({
      where: { fileName: FaviconName },
    });
    const webRoot = GetWebRootKey();
    const indexPath = normalize(join(webRoot, seoPath));
    const clientPath = dirname(indexPath);
    const path = join(clientPath, FaviconName);
    if (favicon && existsSync(clientPath)) {
      MediaModel.saveMediaInPath(favicon, path, true);
      return true;
    }

    return false;
  }

  async saveTempFavicon() {
    const faviconOld = await this.mediaRespository.findOne({
      where: { fileName: FaviconName },
    });

    const faviconTemp = await this.mediaRespository.findOne({
      where: { fileName: FaviconTempName },
    });

    if (faviconTemp && faviconOld) {
      await this.mediaRespository.manager.remove(faviconOld);
    }

    if (faviconTemp) {
      faviconTemp.fileName = FaviconName;
      faviconTemp.displayName = FaviconName;
      await this.mediaRespository.manager.save(faviconTemp);
      MediaModel.saveMediaFile(faviconTemp, true);
    }
  }

  async removeTempFavicon() {
    const faviconTemp = await this.mediaRespository.findOne({
      where: { fileName: FaviconTempName },
    });

    if (faviconTemp) {
      await this.mediaRespository.manager.remove(faviconTemp);
    }
  }

  setSeoInFile(seoData: ISeo) {
    const webRoot = GetWebRootKey();
    const path = normalize(join(webRoot, seoData.path));
    if (existsSync(path)) {
      const content = readFileSync(path, 'utf-8');
      const root = new JSDOM(content);
      const document = root.window.document;
      const headElement = document.querySelector('head');
      const meta = seoData.meta;
      meta.forEach((item) => {
        let metaElement;
        if (item.name !== 'title') {
          let prop = '';
          if (item.name) prop = `[name="${item.name}"]`;
          if (item.property) prop = `[property="${item.property}"]`;
          if (!!prop) {
            metaElement = headElement.querySelector(`meta${prop}`);
            //Remove meta
            if (metaElement) {
              metaElement.remove();
            }
          }

          if (!!item.content) {
            metaElement = document.createElement('meta');
            if (item.name) metaElement.setAttribute('name', item.name);
            if (item.property) metaElement.setAttribute('property', item.property);
            metaElement.setAttribute('content', item.content);
            headElement.appendChild(metaElement);
          }
        } else if (!!item.content) {
          document.title = item.content;
        }
      });

      writeFileSync(path, root.serialize());
    }
  }

  parseISeoMetaToEntityMeta(seoData: ISeo) {
    const meta = {};
    seoData.meta.forEach((item) => {
      meta[item.name || item.property] = item;
    });
    return meta;
  }

  parseEntityMetaToISeoMeta(seoModule: SeoEntity) {
    return Object.values(seoModule.meta).map((meta) => ({
      name: '',
      property: '',
      content: '',
      type: 'text',
      ...meta,
    }));
  }
}
