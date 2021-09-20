import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { GetConnection } from '../database';
import { MediaModel } from '../models/MediaModel';
import { ILanguage, LanguageService } from '../services/LanguageService';
import { LanguageInputGQL, LanguageResponseGQL } from '../modules';

@Resolver()
export class LanguageResolver {
  private languageService: LanguageService;
  constructor() {
    const conn = GetConnection();
    this.languageService = new LanguageService(conn);
  }

  @Query(() => [LanguageResponseGQL])
  async allLanguage(@Arg('urlApi') urlApi: string) {
    const languages = await this.languageService.all(true);
    return languages.map((lang) => {
      return <LanguageResponseGQL>{
        id: lang.id,
        code: lang.code,
        default: lang.default,
        disabled: lang.disabled,
        logo: lang.logo ? MediaModel.getMediaResponse(lang.logo, urlApi) : null,
      };
    });
  }

  @Mutation(() => Boolean)
  async createLanguage(@Arg('data') data: LanguageInputGQL) {
    return await this.languageService.create(data as ILanguage);
  }

  @Mutation(() => Boolean)
  async modifyLanguage(@Arg('data') data: LanguageInputGQL) {
    return await this.languageService.modify(data as ILanguage);
  }
}
