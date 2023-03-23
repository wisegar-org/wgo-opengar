import { defineComponent } from 'vue';
import { useTranslationStore } from 'src/stores/translationStore';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { translationsDoctorsContent, translationsIndexContent } from '../../../models/translations';
import { translations as transBase, NumberDictionary } from '@wisegar-org/wgo-base-models/build/core';
import Loader from '@wisegar-org/wgo-base-client/build/core/components/Loader/Loader.vue';
import { ITranslationInput } from '@wisegar-org/wgo-base-models/build/translation';
import { useLanguageStore } from 'src/stores/languageStore';
import { CasinaModelsService } from 'src/services/CasinaModelsService';
import { useNotifyStore } from 'src/stores/notifyStore';
import { ITranslationResponse } from '@wisegar-org/wgo-base-models/build/translation';
import TranslationComponent from '@wisegar-org/wgo-base-client/build/translation/components/TranslationComponent/TranslationComponent.vue';
import { ApiSettingsConfig } from 'src/api/ApiOptions';
import { StorageService } from '@wisegar-org/wgo-base-client/build/storage/services/StorageService';
import { CasinaDoctorType } from 'src/models/contansts';
import { StorageDoctorItem, StorageServiceItem, StorageServiceItemContent } from 'src/models/StorageModels';
import { getDoctorsListSchema } from './DoctorsContentSchema';
import Table from '@wisegar-org/wgo-base-client/build/core/components/Table/Table.vue';
import { ITablePagination, ITableRowButton } from '@wisegar-org/wgo-base-models/build/core/Table';
import DoctorContentDialog from './DoctorContentDialog.vue';

export default defineComponent({
  name: 'DoctorsContent',
  components: {
    Loader,
    Table,
    TranslationComponent,
    DoctorContentDialog,
  },
  data() {
    const traslationValue: NumberDictionary = {};
    const innerLoading = false;
    const loading = false;
    const search = '';
    const doctors: StorageServiceItem[] = [];
    const componentHeight = 500;

    const fnAction = (row: any) => {
      this.editDoctor(row);
      console.log('click on', row);
    };

    const deleteDoctor = async (row: any) => {
      await this.deleteDoctor(row);
    };
    const rowBtns: ITableRowButton[] = [
      {
        icon: 'edit',
        tooltip: transBase.EDIT,
        fnAction,
      },
      {
        icon: 'delete',
        tooltip: transBase.DELETE,
        fnAction: deleteDoctor,
      },
    ];

    const schema = getDoctorsListSchema(this.tranStore as any, [], rowBtns);
    schema.rowDblClick = fnAction;
    schema.rowsPerPage = this.$q.platform.is.mobile ? [5, 10, 20, 0] : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];
    const showAddEditorDialog = false;
    const countData = 0;
    const pagination: ITablePagination = {
      descending: false,
      page: 1,
      rowsPerPage: schema.rowsPerPageDefault,
      sortBy: '',
    } as ITablePagination;
    const doctorSelected = {} as StorageDoctorItem;

    return {
      search,
      doctors,
      schema,
      countData,
      pagination,
      traslationValue,
      innerLoading,
      loading,
      componentHeight,
      showAddEditorDialog,
      doctorSelected,
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const langStore = useLanguageStore();
    const notifyStore = useNotifyStore();
    const { getLabel } = new BaseTranslateComponent();
    const urlApi = ApiSettingsConfig.API_BASE;

    const transContent: ITranslationResponse = <ITranslationResponse>{
      key: translationsIndexContent.CASINA_INDEX_DOCTORS_TEXT,
      id: translationsIndexContent.CASINA_INDEX_DOCTORS_TEXT,
      value: getLabel(
        tranStore.translationStore as TranslationStore,
        translationsIndexContent.CASINA_INDEX_DOCTORS_TEXT
      ),
    };
    const storageService = new StorageService();

    return {
      urlApi,
      tranStore: tranStore.translationStore as TranslationStore,
      langStore: langStore.languageStore,
      translations: translationsDoctorsContent,
      transBase,
      notifyStore,
      transContent,
      storageService,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    editDoctor(doctor: StorageDoctorItem) {
      this.doctorSelected = doctor;
      this.showAddEditorDialog = true;
    },
    deleteDoctor(doctor: StorageDoctorItem) {
      this.$q
        .dialog({
          title: this.getLabel(transBase.CONFIRM),
          message: this.getLabel(translationsDoctorsContent.DELETE_DOCTOR_MSG),
          persistent: true,
          focus: 'cancel',
          ok: {
            color: 'primary',
            label: this.getLabel(transBase.CONFIRM),
            tabindex: 0,
          },
          cancel: {
            flat: true,
            label: this.getLabel(transBase.CANCEL),
            tabindex: 1,
          },
        })
        .onOk(async () => {
          const result = await this.storageService.deleteStorageItem(doctor.id);
          if (result) {
            this.notifyStore.setNotify({
              type: 'positive',
              position: 'top',
              message: this.getLabel(translationsDoctorsContent.DELETE_DOCTOR_SUCCESS_MSG),
            });
            await this.loadDoctorsContent();
          } else {
            this.notifyStore.setNotify({
              type: 'negative',
              position: 'top',
              message: this.getLabel(translationsDoctorsContent.DELETE_DOCTOR_FAIL_MSG),
            });
          }
        });
    },
    closeDialog() {
      this.showAddEditorDialog = false;
      this.doctorSelected = {} as StorageDoctorItem;
    },
    onChangeDoctorsContent(langId: number, value: string) {
      this.traslationValue[langId] = value;
    },
    getTranslationItem(traslationValue: NumberDictionary, key: string) {
      return Object.keys(traslationValue).map((langId) => {
        const lang = parseInt(langId);
        return {
          languageId: lang,
          key: key,
          value: traslationValue[lang],
        };
      });
    },
    async saveData() {
      this.loading = true;
      let translationsToSet: ITranslationInput[] = [];
      translationsToSet = translationsToSet.concat(
        this.getTranslationItem(this.traslationValue, translationsIndexContent.CASINA_INDEX_DOCTORS_TEXT)
      );
      const arg = {
        imageId: 0,
        translations: translationsToSet,
      };

      const casinaModelsService = new CasinaModelsService();

      if (await casinaModelsService.setCasinaIndexContent(arg)) {
        await this.tranStore.loadAllTranslation();
        this.notifyStore.setNotify({
          message: this.getLabel(translationsIndexContent.CASINA_INDEX_CONTENT_SUCCESS_EDIT),
          position: 'top',
          type: 'positive',
        });
      } else {
        this.notifyStore.setNotify({
          message: this.getLabel(translationsIndexContent.CASINA_INDEX_CONTENT_FAIL_EDIT),
          position: 'top',
          type: 'negative',
        });
      }

      this.loading = false;
    },
    showLoading(loading: boolean) {
      this.loading = loading;
    },
    async searchFilter() {
      this.pagination.page = 1;
      await this.loadDoctorsContent();
    },
    async cleanFilter() {
      this.search = '';
      await this.searchFilter();
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadDoctorsContent();
    },
    async loadDoctorsContent() {
      this.loading = true;
      const doctors = await this.storageService.getStorageByPagination({
        lang: this.langStore.selectedLang.id,
        type: CasinaDoctorType,
        urlApi: ApiSettingsConfig.API_BASE,
        search: this.search,
        loadTranslations: true,
        descending: this.pagination.descending,
        sortBy: this.pagination.sortBy,
        skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        take: this.pagination.rowsPerPage,
      });

      this.countData = doctors.storageItemsCount;
      this.doctors = doctors.storageItems.map(
        (item) =>
          <StorageServiceItem>{
            id: item.id,
            type: item.type,
            content: JSON.parse(item.content) as StorageServiceItemContent,
            image: item.image,
          }
      );

      this.loading = false;
    },
  },
  async mounted() {
    await this.loadDoctorsContent();
  },
});
