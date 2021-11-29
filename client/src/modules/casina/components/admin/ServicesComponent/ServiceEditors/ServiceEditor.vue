<template>
  <div>
    <div class="row">
      <div class="col-12">
        <TranslationSimpleComponent
          class="q-pa-sm"
          :translation="transTitle"
          :label="translationContent.CASINA_SERVICES_ADMIN_TITLE_LABEL"
          :onChange="
            (langId, value) => onChangeTranslation('title', langId, value)
          "
        />
        <TranslationSimpleComponent
          class="q-pa-sm"
          :translation="transDescription"
          :label="translationContent.CASINA_SERVICES_ADMIN_DESCRIPTION_LABEL"
          :onChange="
            (langId, value) => onChangeTranslation('description', langId, value)
          "
        />
      </div>
    </div>
    <q-card-section class="justify-center text-primary row">
      <q-btn
        v-if="showClose"
        unelevated
        @click="() => close(false)"
        icon="close"
        color="primary"
        align="center"
        class="col-12 col-sm-auto q-mt-sm"
        :label="translationContent.WGO_CLOSE_BTN"
      />
      <q-btn
        v-if="showDelete"
        unelevated
        @click="() => (showDeleteConfirm = true)"
        icon="delete"
        color="primary"
        align="center"
        class="col-12 col-sm-auto q-mt-sm"
        :label="translationContent.WGO_DELETE_BTN"
      />
      <q-btn
        unelevated
        @click="() => updateProps()"
        icon="save"
        color="primary"
        align="center"
        :disable="!isValid()"
        class="col-12 col-sm-auto q-mt-sm"
        :label="translationContent.WGO_SAVE_BTN"
      />
    </q-card-section>
    <ConfirmDialog
      icon="delete"
      :showModal="showDeleteConfirm"
      :cancelButton="translationContent.WGO_CLOSE_BTN"
      :okButton="translationContent.WGO_DELETE_BTN"
      :text="translationContent.CASINA_SERVICES_ADMIN_DELETE_TEXT"
      :onConfirm="deleteService"
      :onClose="() => (showDeleteConfirm = false)"
    />
  </div>
</template>

<script lang="ts">
import {
  StorageInputGql,
  TranslationFilterResponseGql
} from '../../../../../../graphql';
import { StorageServiceItem } from '../../../../models/StorageModels';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {
  CasinaServiceType,
  ITranslationServicesAdminKeys
} from '../TranslationsKeys';
import ConfirmDialog from '../../../../../wgo/components/ConfirmDialog/ConfirmDialog.vue';
import TranslationSimpleComponent from '../../../../../wgo/components/Translations/TranslationEditors/TranslationSimpleComponent.vue';
import {
  languageGetters,
  languageNamespace
} from '../../../../../wgo/store/Language';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../../wgo/store/ComponentsState';
import { INotify, NumberDictionary } from '../../../../../wgo/models';
import {
  casinaModelsActionsKeys,
  casinaModelsNamespace
} from '../../../../store/CasinaModels';

@Component({
  components: {
    ConfirmDialog,
    TranslationSimpleComponent
  }
})
export default class EditLanguage extends Vue {
  @Prop() close!: (success: boolean) => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() service!: StorageServiceItem;
  @Prop({ default: true }) showClose!: boolean;
  @Prop({ default: false }) showDelete!: boolean;

  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationServicesAdminKeys;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Action(casinaModelsActionsKeys.createStorageItem, {
    namespace: casinaModelsNamespace
  })
  createServiceItem!: (data: StorageInputGql) => Promise<boolean>;
  @Action(casinaModelsActionsKeys.modifyStorageItem, {
    namespace: casinaModelsNamespace
  })
  modifyServiceItem!: (data: StorageInputGql) => Promise<boolean>;
  @Action(casinaModelsActionsKeys.deleteStorageItem, {
    namespace: casinaModelsNamespace
  })
  deleteServiceItem!: (id: number) => Promise<boolean>;

  form: StorageServiceItem = {
    id: 0,
    type: CasinaServiceType,
    content: {
      titleKey: '',
      descriptionKey: '',
      title: '',
      description: ''
    }
  };
  showDeleteConfirm = false;
  translations: { [key: string]: NumberDictionary } = {};
  transTitle: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: 'transTitle',
    id: 'transTitle'
  };
  transDescription: TranslationFilterResponseGql = <
    TranslationFilterResponseGql
  >{
    key: 'transDescription',
    id: 'transDescription'
  };

  constructor() {
    super();
    if (this.service) {
      this.form = { ...this.service };
      this.transDescription.key = this.service.content.descriptionKey;
      this.transDescription.id = this.service.content.descriptionKey;
      this.transTitle.key = this.service.content.titleKey;
      this.transTitle.id = this.service.content.titleKey;
    }
  }

  isValid() {
    return true;
  }

  onChangeTranslation(prop: string, langId: number, value: string) {
    if (!(prop in this.translations)) this.translations[prop] = {};
    this.translations[prop][langId] = value;
  }

  async deleteService() {
    this.showLoading(true);
    if (await this.deleteServiceItem(this.form.id)) {
      if (this.close) this.close(true);
      this.notify({
        message: this.translationContent.CASINA_SERVICES_ADMIN_SUCCESS_DELETE,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.CASINA_SERVICES_ADMIN_FAIL_DELETE,
        type: 'negative'
      });
    }
    this.showLoading(false);
  }

  getTranslationItem(traslationValue: NumberDictionary) {
    return Object.keys(traslationValue).map(langId => {
      const lang = parseInt(langId);
      return {
        languageId: lang,
        value: traslationValue[lang]
      };
    });
  }

  async updateProps() {
    this.showLoading(true);
    const desc = this.translations.description
      ? this.getTranslationItem(this.translations.description)
      : [];
    const title = this.translations.title
      ? this.getTranslationItem(this.translations.title)
      : [];
    const arg = <StorageInputGql>{
      id: this.form.id,
      type: this.form.type,
      content: JSON.stringify({
        description: desc,
        title
      })
    };

    const result = this.service
      ? await this.modifyServiceItem(arg)
      : await this.createServiceItem(arg);

    if (result) {
      this.notify({
        message: this.service
          ? this.translationContent.CASINA_SERVICES_ADMIN_SUCCESS_EDIT
          : this.translationContent.CASINA_SERVICES_ADMIN_SUCCESS_CREATE,
        type: 'positive'
      });
      if (this.close) this.close(true);
    } else {
      this.notify({
        message: this.service
          ? this.translationContent.CASINA_SERVICES_ADMIN_FAIL_EDIT
          : this.translationContent.CASINA_SERVICES_ADMIN_FAIL_CREATE,
        type: 'negative'
      });
    }
    this.showLoading(false);
  }
}
</script>
