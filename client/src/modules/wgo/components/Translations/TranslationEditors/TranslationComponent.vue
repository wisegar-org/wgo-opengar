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
  @Prop() translation!: TranslationFilterResponseGql;
  @Prop() language!: LanguageResponseGql;
  @Prop() onChange!: (langId: number, value: string) => unknown;
  @Prop() label!: string;

  selectedLang: LanguageResponseGql = this.language;
  translations: { [key: string]: string } =
    this.language && this.translation
      ? {
          [this.language.code]: this.translation.value
        }
      : {};
  value = this.translation.value;

  @Watch('translation')
  @Watch('translation.value')
  @Watch('language')
  setValue() {
    if (this.translation && this.selectedLang && this.language) {
      this.translations[this.selectedLang.code] = this.translation.value;
      this.value = this.translations[this.selectedLang.code];
      this.selectedLang = this.language;
    }
  }

  @Watch('value')
  onChangeEvent() {
    this.translations[this.selectedLang.code] = this.value;
    this.onChange(this.selectedLang.id, this.value);
  }

  async changeLanguage(lang: LanguageResponseGql) {
    this.selectedLang = lang;
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
