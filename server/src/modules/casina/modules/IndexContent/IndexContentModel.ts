import { TranslationService } from '@wisegar-org/wgo-opengar-core';
import { Connection, Repository } from 'typeorm';
import { MediaModel } from '../../../wgo/models/MediaModel';
import CasinaModuleEntity from '../../database/entities/CasinaModuleEntity';
import { CasinaIndexContentInputsGQL } from './IndexContentInputsGQL';

export class IndexContentModel {
  casinaModuleRepository: Repository<CasinaModuleEntity>;
  mediaModel: MediaModel;
  translationService: TranslationService;
  constructor(conn: Connection) {
    this.casinaModuleRepository = conn.getRepository(CasinaModuleEntity);
    this.mediaModel = new MediaModel();
    this.translationService = new TranslationService(conn);
  }

  async getCasinaIndexContent(urlApi: string) {
    const module = await this.casinaModuleRepository.findOne({
      where: {
        id: 1,
      },
      relations: ['image'],
    });
    if (module) {
      return {
        image: module.image ? MediaModel.getMediaResponse(module.image, urlApi) : null,
      };
    }
    return {
      image: null,
    };
  }

  async setCasinaIndexContent(data: CasinaIndexContentInputsGQL) {
    let module = await this.casinaModuleRepository.findOne({
      where: {
        id: 1,
      },
    });
    if (!module) {
      module = new CasinaModuleEntity();
      module.id = 1;
    }

    const media = data.imageId ? await this.mediaModel.getMediaList([data.imageId]) : null;
    if (media && media.length > 0) {
      module.image = media[0];
    }

    for (const translation of data.translations) {
      await this.translationService.setTranslation(translation.languageId, translation.key, translation.value);
    }

    await this.casinaModuleRepository.manager.save(module);

    return true;
  }
}
