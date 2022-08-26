import { defineComponent, PropType } from 'vue';
import Dialog from 'src/wgo-base/core/components/Dialog/Dialog.vue';
import { LanguageStore } from 'src/wgo-base/language/models/LanguageStore';
import { TranslationStore } from 'src/wgo-base/translation/models/TranslationStore';
import { BaseTranslateComponent } from 'src/wgo-base/core/components/BaseComponents';
import { translationsServicesContent } from '../../../models/translations';
import { NumberDictionary, translations as transBase } from 'src/wgo-base/core/models';
import { StorageServiceItem } from 'src/models/StorageModels';
import { CasinaDoctorType, CasinaServiceType } from 'src/models/contansts';
import UploadImageDiv from 'src/wgo-base/storage/components/UploadImageDiv/UploadImageDiv.vue';
import TranslationSimpleComponent from 'src/wgo-base/translation/components/TranslationSimpleComponent/TranslationSimpleComponent.vue';
import { StorageService } from 'src/wgo-base/storage/services/StorageService';
import { IStorageInput } from 'src/wgo-base/storage/models';
import { useNotifyStore } from 'src/stores/notifyStore';
import { ITranslationModel } from 'src/wgo-base/translation/models';

export default defineComponent({
  name: 'ServiceContentDialog',
  props: {
    open: { type: Boolean, default: false },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    service: { type: Object as PropType<StorageServiceItem> },
  },
  components: {
    Dialog,
    UploadImageDiv,
    TranslationSimpleComponent,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const translations: { [key: string]: NumberDictionary } = {};
    const form: StorageServiceItem = {
      id: 0,
      type: CasinaServiceType,
      content: {
        title: '',
        description: '',
        titleKey: '',
        descriptionKey: '',
      },
    };
    if (!!this.service && !!this.service.content) this.from = { ...this.form, ...this.service };
    const transDescription: ITranslationModel = <ITranslationModel>{
      key: this.service?.content ? this.service.content.descriptionKey : 'transDescription',
      id: this.service?.content ? this.service.content.descriptionKey : 'transDescription',
      value: this.service?.content ? getLabel(this.tranStore, this.service.content.description) : '',
    };
    const transTitle: ITranslationModel = <ITranslationModel>{
      key: this.service?.content ? this.service.content.titleKey : 'transTitle',
      id: this.service?.content ? this.service.content.titleKey : 'transTitle',
      value: this.service?.content ? getLabel(this.tranStore, this.service.content.title) : '',
    };
    return {
      form,
      transTitle,
      transDescription,
      translationsServicesContent,
      transBase,
      translations,
      showLoading: false,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  setup() {
    const notifyStore = useNotifyStore();

    return {
      notifyStore,
    };
  },
  methods: {
    onChangeTitleTranslation(langId: number, value: string) {
      this.onChangeTranslation('title', langId, value);
    },
    onChangeDescriptionTranslation(langId: number, value: string) {
      this.onChangeTranslation('description', langId, value);
    },
    onChangeTranslation(prop: string, langId: number, value: string) {
      if (!(prop in this.translations)) this.translations[prop] = {};
      this.translations[prop][langId] = value;
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
    async saveService() {
      const desc = this.translations.description ? this.getTranslationItem(this.translations.description) : [];
      const title = this.translations.title ? this.getTranslationItem(this.translations.title) : [];
      const arg = <IStorageInput>{
        id: this.form.id,
        type: this.form.type,
        content: `${JSON.stringify({
          description: desc,
          title,
        })}`,
      };
      const storageService = new StorageService();
      const result = this.service?.id
        ? await storageService.modifyStorageItem(arg)
        : await storageService.createStorageItem(arg);
      if (result) {
        this.notifyStore.setNotify({
          type: 'positive',
          position: 'top',
          message: this.getLabel(translationsServicesContent.CASINA_SERVICES_SUCCESS_EDIT),
        });
        this.$emit('success', result);
        this.close();
      } else {
        this.notifyStore.setNotify({
          type: 'negative',
          position: 'top',
          message: this.getLabel(translationsServicesContent.CASINA_SERVICES_FAIL_EDIT),
        });
      }
    },
    close() {
      this.$emit('close');
    },
  },
  watch: {
    service() {
      this.transDescription = <ITranslationModel>{
        key: this.service?.content ? this.service.content.descriptionKey : 'transDescription',
        id: this.service?.content ? this.service.content.descriptionKey : 'transDescription',
        value: this.service?.content ? this.getLabel(this.service.content.description) : '',
      };
      this.transTitle = <ITranslationModel>{
        key: this.service?.content ? this.service.content.titleKey : 'transTitle',
        id: this.service?.content ? this.service.content.titleKey : 'transTitle',
        value: this.service?.content ? this.getLabel(this.service.content.title) : '',
      };
      this.form = {
        id: this.service?.id || 0,
        type: CasinaServiceType,
        content: {
          title: this.service?.content?.title || '',
          description: this.service?.content?.description || '',
          titleKey: this.service?.content?.titleKey || '',
          descriptionKey: this.service?.content?.descriptionKey || '',
        },
      };
    },
  },
  emits: ['close', 'success'],
});
