<template>
  <div style="width: 100%">
    <q-card v-if="!loading" flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ translationContent.WGO_CASINA_SCHEDULE_ADMIN_PAGE_TITLE }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="translationContent.WGO_SAVE_BTN"
              @click="() => saveData()"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        {{
          translationContent.WGO_CASINA_SCHEDULE_ADMIN_PAGE_SCHEDULE_FIELD_TITLE
        }}
        <TranslationComponent
          :translation="objScheduleTitle"
          :onChange="
            (langId, value) =>
              onChangeIndexContent(translationsScheduleTitle, langId, value)
          "
        />
        {{
          translationContent.WGO_CASINA_SCHEDULE_ADMIN_PAGE_SCHEDULE_FIELD_CONTENT
        }}
        <TranslationComponent
          :translation="objScheduleContent"
          :onChange="
            (langId, value) =>
              onChangeIndexContent(translationsScheduleContent, langId, value)
          "
        />
      </q-card-section>
    </q-card>

    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import TranslationComponent from '../../../wgo/components/Translations/TranslationEditors/TranslationComponent.vue';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../wgo/store/ComponentsState';
import { INotify, NumberDictionary } from '../../../wgo/models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../../wgo/store/Language';
import {
  LanguageResponseGql,
  TranslationFilterResponseGql,
  TranslationInputGql
} from '../../../../graphql';

@Component({
  components: {
    TranslationComponent
  }
})
export default class ScheduleAdminComponent extends Vue {
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;

  @Action(languageActions.setTranslation, { namespace: languageNamespace })
  setTranslation!: (obj: TranslationInputGql) => boolean;

  loading = true;

  keySchedulePageTitle = 'WGO_CASINA_SCHEDULE_ADMIN_PAGE_TITLE';
  keyScheduleFieldTitle = 'WGO_CASINA_SCHEDULE_ADMIN_PAGE_SCHEDULE_FIELD_TITLE';
  keyScheduleFieldContent =
    'WGO_CASINA_SCHEDULE_ADMIN_PAGE_SCHEDULE_FIELD_CONTENT';

  successSave = 'WGO_CASINA_SCHEDULE_ADMIN_PAGE_SUCCESS_SAVE';
  failSave = 'WGO_CASINA_SCHEDULE_ADMIN_PAGE_FAIL_SAVE';

  keyScheduleTitle = 'WGO_CASINA_SCHEDULE_TITLE';
  keyScheduleContent = 'WGO_CASINA_SCHEDULE_CONTENT';

  objScheduleTitle: TranslationFilterResponseGql = <
    TranslationFilterResponseGql
  >{
    key: this.keyScheduleTitle,
    id: this.keyScheduleTitle
  };

  objScheduleContent: TranslationFilterResponseGql = <
    TranslationFilterResponseGql
  >{
    key: this.keyScheduleContent,
    id: this.keyScheduleContent
  };

  translationsScheduleTitle: NumberDictionary = {};
  translationsScheduleContent: NumberDictionary = {};

  constructor() {
    super();
  }

  getContent(key: string) {
    return key in this.translationContent ? this.translationContent[key] : key;
  }

  getTranslationItem(traslationValue: NumberDictionary, key: string) {
    return Object.keys(traslationValue).map(langId => {
      const lang = parseInt(langId);
      return {
        languageId: lang,
        key: key,
        value: traslationValue[lang]
      };
    });
  }

  saveData() {
    this.loading = true;
    let result = true;
    let translationsToSet: TranslationInputGql[] = [];
    translationsToSet = translationsToSet.concat(
      this.getTranslationItem(
        this.translationsScheduleTitle,
        this.keyScheduleTitle
      ),
      this.getTranslationItem(
        this.translationsScheduleContent,
        this.keyScheduleContent
      )
    );

    translationsToSet.forEach(elem => {
      result = result && this.setTranslation(elem);
    });

    if (result) {
      this.notify({
        message: this.getContent(this.successSave),
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.getContent(this.failSave),
        type: 'negative'
      });
    }

    this.loading = false;
  }

  onChangeIndexContent(
    translations: NumberDictionary,
    langId: number,
    value: string
  ) {
    translations[langId] = value;
  }

  async created() {
    await this.registerTranslations({
      [this.keySchedulePageTitle]: false,
      [this.keyScheduleFieldTitle]: false,
      [this.keyScheduleFieldContent]: false,
      [this.successSave]: false,
      [this.failSave]: false
    });
    this.objScheduleTitle.value = this.getContent(this.keyScheduleTitle);
    this.objScheduleContent.value = this.getContent(this.keyScheduleContent);
    this.loading = false;
  }
}
</script>
