<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="flex justify-center">
          <UploadImageDiv
            :img="form.image"
            :onSavedImg="onSavedImg"
            :ratio="1"
            width="min(max(30vw, 150px), 200px)"
            :showLoading="showLoading"
          />
        </div>
        <TranslationSimpleComponent
          class="q-pa-sm"
          :translation="transName"
          :label="translationContent.CASINA_DOCTORS_ADMIN_NAME_LABEL"
          :onChange="
            (langId, value) => onChangeTranslation('name', langId, value)
          "
        />
        <TranslationSimpleComponent
          class="q-pa-sm"
          :translation="transDescription"
          :label="translationContent.CASINA_DOCTORS_ADMIN_DESCRIPTION_LABEL"
          :onChange="
            (langId, value) => onChangeTranslation('description', langId, value)
          "
        />
        <q-input
          square
          outlined
          class="q-ma-sm"
          v-model="form.content.email"
          lazy-rules="ondemand"
          :label="translationContent.CASINA_DOCTORS_ADMIN_EMAIL_LABEL"
          standout="bg-primary text-white"
          dense
          :rules="[val => !!val || translationContent.WGO_ERROR_NULL_FIELD]"
        />
      </div>
    </div>
    <q-card-section class="justify-center text-primary row">
      <q-btn
        v-if="showClose"
        unelevated
        @click="() => close(false)"
        color="primary"
        icon="close"
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
        class="col-12 col-sm-auto q-mt-sm"
        :label="translationContent.WGO_SAVE_BTN"
      />
    </q-card-section>
    <ConfirmDialog
      icon="delete"
      :showModal="showDeleteConfirm"
      :cancelButton="translationContent.WGO_CLOSE_BTN"
      :okButton="translationContent.WGO_DELETE_BTN"
      :text="translationContent.CASINA_DOCTORS_ADMIN_DELETE_TEXT"
      :onConfirm="deleteDoctor"
      :onClose="() => (showDeleteConfirm = false)"
    />
  </div>
</template>

<script lang="ts">
import {
  MediaResponseGql,
  StorageInputGql,
  TranslationFilterResponseGql
} from 'src/graphql';
import {
  casinaModelsActionsKeys,
  casinaModelsNamespace
} from 'src/modules/casina/store/CasinaModels';
import { INotify, NumberDictionary } from 'src/modules/wgo/models';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import {
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {
  CasinaDoctorType,
  ITranslationDoctorsAdminKeys
} from '../TranslationsKeys';
import UploadImageDiv from '../../../../../wgo/components/UploadImageDiv/UploadImageDiv.vue';
import ConfirmDialog from '../../../../../wgo/components/ConfirmDialog/ConfirmDialog.vue';
import { StorageDoctorItem } from '../../../../models/StorageModels';
import TranslationSimpleComponent from '../../../../../wgo/components/Translations/TranslationEditors/TranslationSimpleComponent.vue';

@Component({
  components: {
    UploadImageDiv,
    ConfirmDialog,
    TranslationSimpleComponent
  }
})
export default class EditLanguage extends Vue {
  @Prop() close!: (success: boolean) => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() doctor!: StorageDoctorItem;
  @Prop({ default: true }) showClose!: boolean;
  @Prop({ default: false }) showDelete!: boolean;

  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationDoctorsAdminKeys;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Action(casinaModelsActionsKeys.createStorageItem, {
    namespace: casinaModelsNamespace
  })
  createDoctorItem!: (data: StorageInputGql) => Promise<boolean>;
  @Action(casinaModelsActionsKeys.modifyStorageItem, {
    namespace: casinaModelsNamespace
  })
  modifyDoctorItem!: (data: StorageInputGql) => Promise<boolean>;
  @Action(casinaModelsActionsKeys.deleteStorageItem, {
    namespace: casinaModelsNamespace
  })
  deleteDoctorItem!: (id: number) => Promise<boolean>;

  form: StorageDoctorItem = {
    id: 0,
    type: CasinaDoctorType,
    content: {
      name: '',
      description: '',
      email: '',
      nameKey: '',
      descriptionKey: ''
    }
  };
  showDeleteConfirm = false;
  translations: { [key: string]: NumberDictionary } = {};
  transDescription: TranslationFilterResponseGql = <
    TranslationFilterResponseGql
  >{
    key: 'transDescription',
    id: 'transDescription'
  };
  transName: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: 'transName',
    id: 'transName'
  };

  constructor() {
    super();
    if (this.doctor) {
      this.form = { ...this.doctor };
      this.transDescription.key = this.doctor.content.descriptionKey;
      this.transDescription.id = this.doctor.content.descriptionKey;
      this.transName.key = this.doctor.content.nameKey;
      this.transName.id = this.doctor.content.nameKey;
    }
  }

  onChangeTranslation(prop: string, langId: number, value: string) {
    if (!(prop in this.translations)) this.translations[prop] = {};
    this.translations[prop][langId] = value;
  }

  onSavedImg(media: MediaResponseGql) {
    this.form.image = media;
  }

  async deleteDoctor() {
    this.showLoading(true);
    if (await this.deleteDoctorItem(this.form.id)) {
      if (this.close) this.close(true);
      this.notify({
        message: this.translationContent.CASINA_DOCTORS_ADMIN_SUCCESS_DELETE,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.CASINA_DOCTORS_ADMIN_FAIL_DELETE,
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
    const name = this.translations.name
      ? this.getTranslationItem(this.translations.name)
      : [];
    const arg = <StorageInputGql>{
      id: this.form.id,
      type: this.form.type,
      content: `${JSON.stringify({
        email: this.form.content.email,
        description: desc,
        name
      })}`,
      image: this.form.image ? this.form.image.id : 0
    };

    const result = this.doctor
      ? await this.modifyDoctorItem(arg)
      : this.createDoctorItem(arg);

    if (result) {
      this.notify({
        message: this.doctor
          ? this.translationContent.CASINA_DOCTORS_ADMIN_SUCCESS_EDIT
          : this.translationContent.CASINA_DOCTORS_ADMIN_SUCCESS_CREATE,
        type: 'positive'
      });
      if (this.close) this.close(true);
    } else {
      this.notify({
        message: this.doctor
          ? this.translationContent.CASINA_DOCTORS_ADMIN_FAIL_EDIT
          : this.translationContent.CASINA_DOCTORS_ADMIN_FAIL_CREATE,
        type: 'negative'
      });
    }
    this.showLoading(false);
  }
}
</script>
