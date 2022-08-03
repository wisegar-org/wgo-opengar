import { DataSource, Repository } from "typeorm";
import CasinaModuleEntity from "../../database/entities/CasinaModuleEntity";
import { IContextBase } from "../../wgo-base/core/models/context";
import { MediaModel } from "../../wgo-base/storage/models/MediaModel";
import { TranslationModel } from "../../wgo-base/translation/models/TranslationModel";
import { CasinaIndexContentInputs } from "./IndexContentInputs";

export class IndexContentModel {
  dataSource: DataSource;
  casinaModuleRepository: Repository<CasinaModuleEntity>;
  mediaModel: MediaModel;
  translationModel: TranslationModel;
  constructor(ctx: IContextBase) {
    this.dataSource = ctx.dataSource;
    this.casinaModuleRepository =
      this.dataSource.getRepository(CasinaModuleEntity);
    this.mediaModel = new MediaModel(ctx);
    this.translationModel = new TranslationModel(ctx);
  }

  async getCasinaIndexContent(urlApi: string) {
    const module = await this.casinaModuleRepository.findOne({
      where: {
        id: 1,
      },
      relations: ["image"],
    });
    if (module) {
      return {
        image: module.image
          ? this.mediaModel.getMediaResponse(module.image, urlApi)
          : null,
      };
    }
    return {
      image: null,
    };
  }

  async setCasinaIndexContent(data: CasinaIndexContentInputs) {
    let module = await this.casinaModuleRepository.findOne({
      where: {
        id: 1,
      },
    });
    if (!module) {
      module = new CasinaModuleEntity();
      module.id = 1;
    }

    const media = data.imageId
      ? await this.mediaModel.getMediaList([data.imageId])
      : null;
    if (media && media.length > 0) {
      module.image = media[0];
    }

    for (const translation of data.translations) {
      await this.translationModel.setTranslation(
        translation.languageId,
        translation.key,
        translation.value
      );
    }

    await this.casinaModuleRepository.manager.save(module);

    return true;
  }
}
