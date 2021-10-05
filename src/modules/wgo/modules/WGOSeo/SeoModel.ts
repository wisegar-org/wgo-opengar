import { join, normalize } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs-extra';
import { JSDOM } from 'jsdom';
import { Connection, Repository } from 'typeorm';
import SeoEntity from '../../database/entities/SeoEntity';
import { GetWebRootKey } from '../../settings/ConfigService';

export interface IMetaProps {
  name: string;
  property: string;
  content: string;
}

export interface IMeta {
  [key: string]: IMetaProps;
}

export interface ISeo {
  module: string;
  path: string;
  meta: IMetaProps[];
}

export class SeoModel {
  seoRepository: Repository<SeoEntity>;
  /**
   *
   */
  constructor(conn: Connection) {
    this.seoRepository = conn.getRepository(SeoEntity);
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

  async getSeoData(): Promise<ISeo> {
    const seoModule = await this.getSeoEntity();
    const meta = this.parseEntityMetaToISeoMeta(seoModule);
    return {
      module: seoModule.module,
      path: seoModule.path,
      meta: meta,
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
    return result;
  }

  async setSeoMeta(seoMeta: IMetaProps) {
    let seoModule = await this.getSeoEntity();
    seoModule.meta[seoMeta.name || seoMeta.property].content = seoMeta.content;
    await this.seoRepository.manager.save(seoModule);
    this.setSeoInFile(<ISeo>{ meta: [seoMeta], path: seoModule.path });
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
    return Object.values(seoModule.meta).map((meta) => ({ name: '', property: '', content: '', ...meta }));
  }
}
