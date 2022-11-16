import { IContextBase } from "../../../core/models/context";
import { MediaModel } from "../../models/MediaModel";

export const mediaPublicSeeder = async (ctx: IContextBase) => {
  const mediaModel = new MediaModel(ctx);
  await mediaModel.saveAllPublicMediaOnFiles();
};
