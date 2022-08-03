import { Arg, Mutation, Query, Resolver, Authorized, Ctx } from "type-graphql";
import { LanguageResponse } from "./LanguageResponses";
import { LanguageInput, LanguagePostInput } from "./LanguageInputs";
import { LanguageModel } from "../models/LanguageModel";
import {
  LANGUAGE_PATH_GET_ALL_LANGUAGE,
  LANGUAGE_PATH_GET_LANGUAGE,
  LANGUAGE_PATH_POST_LANGUAGE,
  LANGUAGE_PATH_PUT_LANGUAGE,
} from "../router/server";
import { IdInput } from "../../core/resolvers/CoreInputs";
import { IContextBase } from "../../core/models/context";

@Resolver()
export class LanguageResolver {
  @Query(() => [LanguageResponse], { name: LANGUAGE_PATH_GET_ALL_LANGUAGE })
  async getAllLanguage(@Ctx() ctx: IContextBase) {
    const languageModel = new LanguageModel(ctx);
    const languages = await languageModel.getAllLanguage();
    return languages;
  }

  @Query(() => LanguageResponse, { name: LANGUAGE_PATH_GET_LANGUAGE })
  async getLanguage(@Arg("data") data: IdInput, @Ctx() ctx: IContextBase) {
    const languageModel = new LanguageModel(ctx);
    const language = await languageModel.getLanguage(data);
    return language;
  }

  @Authorized()
  @Mutation(() => LanguageResponse, { name: LANGUAGE_PATH_POST_LANGUAGE })
  async postLanguage(
    @Arg("data") data: LanguagePostInput,
    @Ctx() ctx: IContextBase
  ) {
    const languageModel = new LanguageModel(ctx);
    const language = await languageModel.postLanguage(data);
    return language;
  }

  @Authorized()
  @Mutation(() => LanguageResponse, { name: LANGUAGE_PATH_PUT_LANGUAGE })
  async putLanguage(
    @Arg("data") data: LanguageInput,
    @Ctx() ctx: IContextBase
  ) {
    const languageModel = new LanguageModel(ctx);
    const language = await languageModel.putLanguage(data);
    return language;
  }
}
