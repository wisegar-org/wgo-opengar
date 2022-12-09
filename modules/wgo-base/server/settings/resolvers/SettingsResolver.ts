import { Arg, Authorized, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { SettingsResponse } from "./SettingsResolvers";
import { SettingsModel } from "../models/SettingsModel";
import { PostSettingInput } from "./SettingsInputs";
import {
  SETTINGS_PATH_GET_ALL_SETTINGS,
  SETTINGS_PATH_SET_SETTING,
} from "../../../models/settings/server";
import { IContextBase } from "../../../models/core/context";

@Resolver()
export class SettingsResolver {
  @Authorized()
  @Query(() => [SettingsResponse], { name: SETTINGS_PATH_GET_ALL_SETTINGS })
  async getAllSettings(@Ctx() ctx: IContextBase) {
    const emailMediaModel = new SettingsModel(ctx);
    const emails = await emailMediaModel.getAllSettingsList();
    return emails as SettingsResponse[];
  }

  @Authorized()
  @Mutation(() => Boolean, { name: SETTINGS_PATH_SET_SETTING })
  async setSetting(
    @Arg("data") data: PostSettingInput,
    @Ctx() ctx: IContextBase
  ) {
    const emailMediaModel = new SettingsModel(ctx);
    const result = await emailMediaModel.setSettings(data as any);
    return result;
  }
}
