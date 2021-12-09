<template>
  <div class="q-px-none q-py-md" style="width: 100%">
    <div class="row">
      <div class="col-12">
        <LanguageSimpleSelect
          :language="language"
          :fullWidth="true"
          :langSelected="changeLanguage"
        />
      </div>
      <div class="col-12">
        <QEditorToolbar :toEdit="this" propToEdir="value" :label="label" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  GetTranslationInputGql,
  LanguageResponseGql,
  TranslationFilterResponseGql,
  TranslationInputGql
} from '../../../../../graphql';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import LanguageSimpleSelect from '../../Languages/LanguageSelect/LanguageSimpleSelect.vue';
import QEditorToolbar from '../../QEditorToolbar.vue';
import { ITranslationTranslationKeys } from '../TranslationsKeys';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../../store/Language';

@Component({
  components: {
    LanguageSimpleSelect,
    QEditorToolbar
  }
})
export default class TranslationComponent extends Vue {
  @Action(languageActions.getTranslation, { namespace: languageNamespace })
  getTranslation!: (arg: GetTranslationInputGql) => Promise<string>;
  @Action(languageActions.setTranslation, { namespace: languageNamespace })
  setTranslation!: (arg: TranslationInputGql) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationTranslationKeys;
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  languageSite!: LanguageResponseGql;
  @Prop() translation!: TranslationFilterResponseGql;
  @Prop() language!: LanguageResponseGql;
  @Prop() onChange!: (langId: number, value: string) => unknown;
  @Prop() label!: string;

  translations: { [key: string]: string } =
    this.language && this.translation
      ? {
          [this.language.code]: this.translation.value
        }
      : {};
  value = this.translation.value;
  selectedLanguage: LanguageResponseGql = this.language
    ? this.language
    : this.languageSite;

  @Watch('translation')
  @Watch('translation.value')
  @Watch('language')
  setValue() {
    if (this.translation && this.selectedLanguage && this.language) {
      this.translations[this.selectedLanguage.code] = this.translation.value;
      this.value = this.translations[this.selectedLanguage.code];
      this.selectedLanguage = this.language || this.languageSite;
    }
  }

  @Watch('languageSite')
  async changeLanguageSite() {
    await this.changeLanguage(this.languageSite);
  }

  @Watch('value')
  onChangeEvent() {
    this.translations[this.selectedLanguage.code] = this.value;
    this.onChange(this.selectedLanguage.id, this.value);
  }

  async changeLanguage(lang: LanguageResponseGql) {
    this.selectedLanguage = lang;
    if (!(lang.code in this.translations)) {
      this.translations[lang.code] = await this.getTranslation({
        languageId: lang.id,
        key: this.translation.key
      });
    }
    this.value = this.translations[lang.code];
  }
}
</script>
