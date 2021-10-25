import { TranslationService } from '@wisegar-org/wgo-opengar-core';
import { Connection, Repository } from 'typeorm';
import { MediaModel } from '../../../wgo/models/MediaModel';
import FinanceModuleEntity from '../../database/entities/FinanceModuleEntity';
import { FinanceIndexContentInputsGQL } from './IndexContentInputsGQL';

export class IndexContentModel {
  financeModuleRepository: Repository<FinanceModuleEntity>;
  mediaModel: MediaModel;
  translationService: TranslationService;
  constructor(conn: Connection) {
    this.financeModuleRepository = conn.getRepository(FinanceModuleEntity);
    this.mediaModel = new MediaModel();
    this.translationService = new TranslationService(conn);
  }

  async getFinanceIndexContent(urlApi: string) {
    const module = await this.financeModuleRepository.findOne({
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

  async setFinanceIndexContent(data: FinanceIndexContentInputsGQL) {
    let module = await this.financeModuleRepository.findOne({
      where: {
        id: 1,
      },
    });
    if (!module) {
      module = new FinanceModuleEntity();
      module.id = 1;
    }

    const media = data.imageId ? await this.mediaModel.getMediaList([data.imageId]) : null;
    if (media && media.length > 0) {
      module.image = media[0];
    }

    for (const translation of data.translations) {
      await this.translationService.setTranslation(translation.languageId, translation.key, translation.value);
    }

    await this.financeModuleRepository.manager.save(module);

    return true;
  }
}
