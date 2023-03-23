<template>
  <div class="q-pa-md" style="width: 100%">
    <div class="row">
      <div class="col-12">
        <LanguageSimpleSelect
          :language="language"
          :fullWidth="true"
          :langSelected="changeLanguage"
        />
      </div>
      <div class="col-12">
        <QEditorToolbar
          :toEdit="this"
          propToEdir="value"
          :label="translationContent.WGO_TRANSLATIONS_VALUE_LABEL"
        />
      </div>
    </div>
    <q-card-actions align="right" class="text-primary">
      <q-btn
        unelevated
        @click="() => saveTranslation()"
        :disabled="
          !!selectedLang &&
          !!translations &&
          value === translations[selectedLang.code]
        "
        icon="save"
        color="primary"
        align="around"
        class="btn-fixed-width btn_width"
        :label="translationContent.WGO_SAVE_BTN"
      />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import {
  GetTranslationInputGql,
  LanguageResponseGql,
  TranslationFilterResponseGql,
  TranslationInputGql,
} from '../../../../../graphql';
import {
  componentsActionsKeys,
  componentsNamespace,
} from '../../../store/ComponentsState';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import LanguageSimpleSelect from '../../Languages/LanguageSelect/LanguageSimpleSelect.vue';
import { INotify } from '@wisegar-org/wgo-base-models/build/';
import QEditorToolbar from '../../QEditorToolbar.vue';
import { ITranslationTranslationKeys } from '../TranslationsKeys';
import {
  languageActions,
  languageGetters,
  languageNamespace,
} from '../../../store/Language';

@Component({
  components: {
    LanguageSimpleSelect,
    QEditorToolbar,
  },
})
export default class TranslationEditor extends Vue {
  @Action(languageActions.getTranslation, { namespace: languageNamespace })
  getTranslation!: (arg: GetTranslationInputGql) => Promise<string>;
  @Action(languageActions.setTranslation, { namespace: languageNamespace })
  setTranslation!: (arg: TranslationInputGql) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationTranslationKeys;
  @Prop() translation!: TranslationFilterResponseGql;
  @Prop() language!: LanguageResponseGql;

  selectedLang: LanguageResponseGql = this.language;
  translations: { [key: string]: string } =
    this.language && this.translation
      ? {
          [this.language.code]: this.translation.value,
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

  async changeLanguage(lang: LanguageResponseGql) {
    this.selectedLang = lang;
    if (!(lang.code in this.translations)) {
      this.translations[lang.code] = await this.getTranslation({
        languageId: lang.id,
        key: this.translation.key,
      });
    }
    this.value = this.translations[lang.code];
  }

  async saveTranslation() {
    if (
      await this.setTranslation({
        languageId: this.selectedLang.id,
        key: this.translation.key,
        value: this.value,
      })
    ) {
      this.translations[this.selectedLang.code] = this.value;
      this.notify({
        message: this.translationContent.WGO_TRANSLATIONS_SUCCESS_EDIT_ACTION,
        type: 'positive',
      });
    }
  }
}
</script>
