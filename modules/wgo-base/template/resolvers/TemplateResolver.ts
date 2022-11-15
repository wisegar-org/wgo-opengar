import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { IContextBase } from "../../core/models/context";
import { TemplateModel } from "../models/TemplateModel";
import {
  TEMPLATE_PATH_GET_BY_TYPE,
  TEMPLATE_PATH_POST,
} from "../router/server";
import { TemplateInput } from "./TemplateInputs";
import { TemplateResponse } from "./TemplateResponses";

@Resolver()
export class StorageResolver {
  @Query(() => [TemplateResponse], { name: TEMPLATE_PATH_GET_BY_TYPE })
  async getTemplateByType(@Arg("type") type: string, @Ctx() ctx: IContextBase) {
    const templateModel = new TemplateModel(ctx);
    const result = await templateModel.getTemplateByType(type);
    return result;
  }

  @Authorized()
  @Mutation(() => Boolean, { name: TEMPLATE_PATH_POST })
  async createStorageItem(
    @Arg("data") data: TemplateInput,
    @Ctx() ctx: IContextBase
  ) {
    const templateModel = new TemplateModel(ctx);
    const result = await templateModel.saveTamplate(data);
    return !!result;
  }
}
