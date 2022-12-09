<template>
  <div>
    <div class="flex justify-center q-pb-md">
      <UploadImageDiv
        :img="imageLogo"
        :onSavedImg="setImageLogo"
        width="200px"
        sizeIcon="100px"
        :showLoading="showLoading"
      />
    </div>
    <div class="row">
      <div class="col-12">
        <q-input
          square
          outlined
          class="q-ma-sm"
          v-model="form.code"
          lazy-rules="ondemand"
          :autofocus="true"
          :label="translationContent.WGO_LANGUAGE_COLUMN_CODE_LABEL"
          standout="bg-primary text-white"
          dense
          :rules="[
            (val) => !!val || translationContent.WGO_LANGUAGE_ERROR_NULL_FIELD,
          ]"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-toggle
          :label="translationContent.WGO_LANGUAGE_COLUMN_DEFAULT_LABEL"
          v-model="form.default"
          checked-icon="check"
          unchecked-icon="clear"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-toggle
          :label="translationContent.WGO_LANGUAGE_COLUMN_ENABLED_LABEL"
          v-model="form.enabled"
          checked-icon="check"
          unchecked-icon="clear"
        />
      </div>
    </div>
    <q-card-section class="justify-center text-primary row">
      <q-btn
        v-if="showClose"
        unelevated
        @click="() => close(false)"
        color="primary"
        align="around"
        class="col-12 col-sm-auto q-mt-sm"
        :label="translationContent.WGO_CLOSE_BTN"
      />
      <q-btn
        unelevated
        @click="() => updateProps()"
        color="primary"
        align="around"
        :disable="!isValid()"
        class="col-12 col-sm-auto q-mt-sm"
        :label="translationContent.WGO_SAVE_BTN"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import {
  LanguageInputGql,
  LanguageResponseGql,
  MediaResponseGql,
} from '../../../../../graphql';
import {
  componentsActionsKeys,
  componentsNamespace,
} from '../../../store/ComponentsState';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import UploadImageDiv from '../../UploadImageDiv/UploadImageDiv.vue';
import { INotify } from '@wisegar-org/wgo-base-models/build/';
import { ITranslationLanguageKeys } from '../TranslationsKeys';
import {
  languageActions,
  languageGetters,
  languageNamespace,
} from '../../../store/Language';

@Component({
  components: {
    UploadImageDiv,
  },
})
export default class EditLanguage extends Vue {
  @Prop() language!: LanguageResponseGql;
  @Prop() close!: (status: boolean) => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop({ default: true }) showClose!: boolean;

  @Action(languageActions.createLanguage, { namespace: languageNamespace })
  createLanguage!: (record: LanguageInputGql) => Promise<boolean>;
  @Action(languageActions.modifyLanguage, { namespace: languageNamespace })
  modifyLanguage!: (record: LanguageInputGql) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationLanguageKeys;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  form: LanguageInputGql = {
    id: 0,
    code: '',
    default: false,
    enabled: false,
    logoId: 0,
  };

  imageLogo: MediaResponseGql | null = null;

  constructor() {
    super();
    if (this.language) {
      this.form.id = this.language.id;
      this.form.code = this.language.code;
      this.form.default = this.language.default;
      this.form.enabled = this.language.enabled;
      if (!!this.language.logo) {
        this.form.logoId = this.language.logo.id;
        this.imageLogo = this.language.logo;
      }
    }
  }

  isValid() {
    return !!this.form.code;
  }

  setImageLogo(img: MediaResponseGql) {
    this.imageLogo = img;
    this.form.logoId = this.imageLogo.id;
  }

  async updateProps() {
    this.showLoading(true);
    const arg = <LanguageInputGql>{
      ...this.form,
    };

    const result = this.language
      ? await this.modifyLanguage(arg)
      : this.createLanguage(arg);

    if (result) {
      this.notify({
        message: this.language
          ? this.translationContent.WGO_LANGUAGE_SUCCESS_EDIT_ACTION
          : this.translationContent.WGO_LANGUAGE_SUCCESS_CREATE_ACTION,
        type: 'positive',
      });
      this.close(true);
    }
    this.showLoading(false);
  }
}
</script>
