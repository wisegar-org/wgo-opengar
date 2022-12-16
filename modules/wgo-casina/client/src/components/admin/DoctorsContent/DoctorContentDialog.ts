import { defineComponent, PropType } from 'vue';
import Dialog from '@wisegar-org/wgo-base-client/build/core/components/Dialog/Dialog.vue';
import { LanguageStore } from '@wisegar-org/wgo-base-client/build/language/store/LanguageStore';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { translationsDoctorsContent } from '../../../models/translations';
import { IMediaModel, NumberDictionary, translations as transBase } from '@wisegar-org/wgo-base-models';
import { StorageDoctorItem } from 'src/models/StorageModels';
import { CasinaDoctorType } from 'src/models/contansts';
import UploadImageDiv from '@wisegar-org/wgo-base-client/build/storage/components/UploadImageDiv/UploadImageDiv.vue';
import TranslationSimpleComponent from '@wisegar-org/wgo-base-client/build/translation/components/TranslationSimpleComponent/TranslationSimpleComponent.vue';
import { MediaService } from '@wisegar-org/wgo-base-client/build/storage/services/MediaService';
import { StorageService } from '@wisegar-org/wgo-base-client/build/storage/services/StorageService';
import { IStorageInput } from '@wisegar-org/wgo-base-models';
import { useNotifyStore } from 'src/stores/notifyStore';
import { ITranslationModel } from '@wisegar-org/wgo-base-models';
import { ApiSettingsConfig } from 'src/api/ApiOptions';

export default defineComponent({
  name: 'DoctorContentDialog',
  props: {
    open: { type: Boolean, default: false },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    doctor: { type: Object as PropType<StorageDoctorItem> },
  },
  components: {
    Dialog,
    UploadImageDiv,
    TranslationSimpleComponent,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const translations: { [key: string]: NumberDictionary } = {};
    const form: StorageDoctorItem = {
      id: 0,
      type: CasinaDoctorType,
      content: {
        name: '',
        description: '',
        email: '',
        nameKey: '',
        descriptionKey: '',
      },
    };
    if (!!this.doctor && !!this.doctor.content) this.from = { ...this.form, ...this.doctor };
    const transDescription: ITranslationModel = <ITranslationModel>{
      key: this.doctor?.content ? this.doctor.content.descriptionKey : 'transDescription',
      id: this.doctor?.content ? this.doctor.content.descriptionKey : 'transDescription',
      value: this.doctor?.content ? getLabel(this.tranStore, this.doctor.content.description) : '',
    };
    const transName: ITranslationModel = <ITranslationModel>{
      key: this.doctor?.content ? this.doctor.content.nameKey : 'transName',
      id: this.doctor?.content ? this.doctor.content.nameKey : 'transName',
      value: this.doctor?.content ? getLabel(this.tranStore, this.doctor.content.name) : '',
    };
    return {
      form,
      transName,
      transDescription,
      translationsDoctorsContent,
      transBase,
      translations,
      showLoading: false,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  setup() {
    const notifyStore = useNotifyStore();
    const urlApi = ApiSettingsConfig.API_BASE;

    return {
      notifyStore,
      urlApi,
    };
  },
  methods: {
    onChangeNameTranslation(langId: number, value: string) {
      this.onChangeTranslation('name', langId, value);
    },
    onChangeDescriptionTranslation(langId: number, value: string) {
      this.onChangeTranslation('description', langId, value);
    },
    onChangeTranslation(prop: string, langId: number, value: string) {
      if (!(prop in this.translations)) this.translations[prop] = {};
      this.translations[prop][langId] = value;
    },
    async onSavedImg(media: IMediaModel) {
      if (this.doctor?.image?.id !== this.form.image?.id && !!this.form.image?.id) {
        const mediaService = new MediaService();
        await mediaService.deleteFile(this.form.image.id);
      }
      this.form.image = media;
    },
    getTranslationItem(traslationValue: NumberDictionary) {
      return Object.keys(traslationValue).map((langId) => {
        const lang = parseInt(langId);
        return {
          languageId: lang,
          value: traslationValue[lang],
        };
      });
    },
    async saveDoctor() {
      const desc = this.translations.description ? this.getTranslationItem(this.translations.description) : [];
      const name = this.translations.name ? this.getTranslationItem(this.translations.name) : [];
      const arg = <IStorageInput>{
        id: this.form.id,
        type: this.form.type,
        content: `${JSON.stringify({
          email: this.form.content.email,
          description: desc,
          name,
        })}`,
        image: this.form.image ? this.form.image.id : 0,
      };
      const storageService = new StorageService();
      const result = this.doctor?.id
        ? await storageService.modifyStorageItem(arg)
        : await storageService.createStorageItem(arg);
      if (result) {
        this.notifyStore.setNotify({
          type: 'positive',
          position: 'top',
          message: this.getLabel(translationsDoctorsContent.CASINA_DOCTORS_SUCCESS_EDIT),
        });
        this.$emit('success', result);
        this.close();
      } else {
        this.notifyStore.setNotify({
          type: 'negative',
          position: 'top',
          message: this.getLabel(translationsDoctorsContent.CASINA_DOCTORS_FAIL_EDIT),
        });
      }
    },
    close() {
      this.$emit('close');
    },
  },
  watch: {
    doctor() {
      this.transDescription = <ITranslationModel>{
        key: this.doctor?.content ? this.doctor.content.descriptionKey : 'transDescription',
        id: this.doctor?.content ? this.doctor.content.descriptionKey : 'transDescription',
        value: this.doctor?.content ? this.getLabel(this.doctor.content.description) : '',
      };
      this.transName = <ITranslationModel>{
        key: this.doctor?.content ? this.doctor.content.nameKey : 'transName',
        id: this.doctor?.content ? this.doctor.content.nameKey : 'transName',
        value: this.doctor?.content ? this.getLabel(this.doctor.content.name) : '',
      };
      this.form = {
        id: this.doctor?.id || 0,
        type: CasinaDoctorType,
        content: {
          name: this.doctor?.content?.name || '',
          description: this.doctor?.content?.description || '',
          email: this.doctor?.content?.email || '',
          nameKey: this.doctor?.content?.nameKey || '',
          descriptionKey: this.doctor?.content?.descriptionKey || '',
        },
        image: this.doctor?.image,
      };
    },
  },
  emits: ['close', 'success'],
});
