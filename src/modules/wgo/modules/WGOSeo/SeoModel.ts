import { join, normalize } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs-extra';
import { JSDOM } from 'jsdom';
import { Connection, Repository } from 'typeorm';
import SeoEntity from '../../database/entities/SeoEntity';
import { GetWebRootKey } from '../../settings/ConfigService';

export interface IMetaProps {
  [key: string]: string;
}

export interface IMeta {
  [key: string]: IMetaProps;
}

export interface ISeo {
  module: string;
  path: string;
  meta: { name: string; props: { name: string; value: string }[] }[];
}

export class SeoModel {
  seoRepository: Repository<SeoEntity>;
  /**
   *
   */
  constructor(conn: Connection) {
    this.seoRepository = conn.getRepository(SeoEntity);
  }

  async getSeoData(): Promise<ISeo> {
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
    const oldMeta = this.parseEntityMetaToISeoMeta(seoModule).map((item) => ({ name: item.name, props: [] }));
    seoModule.path = seoData.path;
    const meta = this.parseISeoMetaToEntityMeta(seoData);
    seoModule.meta = meta;
    const result = !!(await this.seoRepository.manager.save(seoModule));
    seoData.meta = oldMeta.concat(seoData.meta);
    this.setSeoInFile(seoData);
    return result;
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
        const props = item.props;
        let metaElement;
        if (!!item.name) {
          metaElement = headElement.querySelector(`meta[name="${item.name}"]`);

          //Remove meta
          if (metaElement) {
            metaElement.remove();
            // headElement.removeChild(metaElement);
          }
        }

        if (props.length > 0) {
          metaElement = document.createElement('meta');
          if (item.name) metaElement.setAttribute('name', item.name);
          props.forEach((prop) => {
            metaElement.setAttribute(prop.name, prop.value);
          });
          headElement.appendChild(metaElement);
        }
      });

      writeFileSync(path, root.serialize());
    }
  }

  parseISeoMetaToEntityMeta(seoData: ISeo) {
    const meta = {};
    seoData.meta.forEach((item) => {
      if (!!item.props && item.props.length > 0) {
        const props = {};
        item.props.forEach((prop) => {
          props[prop.name] = prop.value;
        });
        meta[item.name] = props;
      }
    });
    return meta;
  }

  parseEntityMetaToISeoMeta(seoModule: SeoEntity) {
    const meta = Object.keys(seoModule.meta).map((itemName) => {
      const props = seoModule.meta[itemName];
      const propsList = Object.keys(props).map((nameP) => ({
        name: nameP,
        value: props[nameP],
      }));
      return {
        name: itemName,
        props: [{ name: 'name', value: itemName }].concat(propsList),
      };
    });
    return meta;
  }
}
