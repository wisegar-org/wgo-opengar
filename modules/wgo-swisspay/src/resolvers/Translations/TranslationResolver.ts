import { GraphQLUpload } from 'graphql-upload';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { IContextBase } from '../../wgo-base/core/models/context';
import { TranslationResolver } from '../../wgo-base/translation/resolvers/TranslationResolver';
import { TRANSLATION_PATH_IMPORT_TRANSLATION } from '../../wgo-base/translation/router/server';

@InputType()
export class ImportTranslationsInput {
  @Field(() => GraphQLUpload, { description: 'File uploaded', nullable: true })
  file!: typeof GraphQLUpload;
}

@Resolver()
export class PublicTranslationResolver extends TranslationResolver {
  @Mutation(() => Boolean, { name: TRANSLATION_PATH_IMPORT_TRANSLATION })
  async importTranslations(@Arg('data') data: ImportTranslationsInput, @Ctx() ctx: IContextBase) {
    const result = await this.importTranslationsPrivate(data, ctx);
    return result;
  }
}
