import { defineComponent } from 'vue';
import { useTranslationStore } from 'src/stores/translationStore';
import { BaseTranslateComponent } from 'src/wgo-base/core/components/BaseComponents';
import { TranslationStore } from 'src/wgo-base/translation/models/TranslationStore';
import { translationsServicesContent, translationsIndexContent } from '../../../models/translations';
import { translations as transBase, NumberDictionary, IMediaModel } from '../../../wgo-base/core/models';
import Loader from '../../../wgo-base/core/components/Loader/Loader.vue';
import { TranslationInput } from 'src/wgo-base/translation/resolvers/TranslationInputs';
import { useLanguageStore } from 'src/stores/languageStore';
import { CasinaModelsService } from 'src/services/CasinaModelsService';
import { useNotifyStore } from 'src/stores/notifyStore';
import { TranslationResponse } from 'src/wgo-base/translation/resolvers/TranslationResponses';
import TranslationComponent from '../../../wgo-base/translation/components/TranslationComponent/TranslationComponent.vue';
import { ApiSettingsConfig } from 'src/api/ApiOptions';
import { StorageService } from 'src/wgo-base/storage/services/StorageService';
import { CasinaDoctorType, CasinaServiceType } from 'src/models/contansts';
import { StorageServiceItem, StorageServiceItemContent } from 'src/models/StorageModels';
import { ITablePagination, ITableRowButton } from 'src/wgo-base/core/models/Table';
import { getServicesListSchema } from './ServicesContentSchema';
import Table from '../../../wgo-base/core/components/Table/Table.vue';
import ServiceContentDialog from './ServiceContentDialog.vue';

export default defineComponent({
  name: 'ServicesContent',
  components: {
    Loader,
    Table,
    TranslationComponent,
    ServiceContentDialog,
  },
  data() {
    const traslationValue: NumberDictionary = {};
    const innerLoading = false;
    const loading = false;
    const search = '';
    const services: StorageServiceItem[] = [];
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

    const schema = getServicesListSchema(this.tranStore as any, [], rowBtns);
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
    const serviceSelected = {} as StorageServiceItem;

    return {
      search,
      services,
      schema,
      countData,
      pagination,
      traslationValue,
      innerLoading,
      loading,
      componentHeight,
      showAddEditorDialog,
      serviceSelected,
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const langStore = useLanguageStore();
    const notifyStore = useNotifyStore();
    const { getLabel } = new BaseTranslateComponent();
    const urlApi = ApiSettingsConfig.API_BASE;

    const transContent: TranslationResponse = <TranslationResponse>{
      key: translationsIndexContent.CASINA_INDEX_SERVICES_TEXT,
      id: translationsIndexContent.CASINA_INDEX_SERVICES_TEXT,
      value: getLabel(
        tranStore.translationStore as TranslationStore,
        translationsIndexContent.CASINA_INDEX_SERVICES_TEXT
      ),
    };
    const storageService = new StorageService();

    return {
      urlApi,
      tranStore: tranStore.translationStore as TranslationStore,
      langStore: langStore.languageStore,
      translations: translationsServicesContent,
      transBase,
      notifyStore,
      transContent,
      storageService,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    editDoctor(service: StorageServiceItem) {
      this.serviceSelected = service;
      this.showAddEditorDialog = true;
    },
    deleteDoctor(service: StorageServiceItem) {
      this.$q
        .dialog({
          title: this.getLabel(transBase.CONFIRM),
          message: this.getLabel(translationsServicesContent.DELETE_SERVICE_MSG),
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
          const result = await this.storageService.deleteStorageItem(service.id);
          if (result) {
            this.notifyStore.setNotify({
              type: 'positive',
              position: 'top',
              message: this.getLabel(translationsServicesContent.DELETE_SERVICE_SUCCESS_MSG),
            });
            await this.loadServicesContent();
          } else {
            this.notifyStore.setNotify({
              type: 'negative',
              position: 'top',
              message: this.getLabel(translationsServicesContent.DELETE_SERVICE_FAIL_MSG),
            });
          }
        });
    },
    closeDialog() {
      this.showAddEditorDialog = false;
      this.serviceSelected = {} as StorageServiceItem;
    },
    onChangeServicesContent(langId: number, value: string) {
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
      let translationsToSet: TranslationInput[] = [];
      translationsToSet = translationsToSet.concat(
        this.getTranslationItem(this.traslationValue, translationsIndexContent.CASINA_INDEX_SERVICES_TEXT)
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
      await this.loadServicesContent();
    },
    async cleanFilter() {
      this.search = '';
      await this.searchFilter();
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadServicesContent();
    },
    async loadServicesContent() {
      this.loading = true;
      const services = await this.storageService.getStorageByPagination({
        lang: this.langStore.selectedLang.id,
        type: CasinaServiceType,
        urlApi: ApiSettingsConfig.API_BASE,
        search: this.search,
        loadTranslations: true,
        descending: this.pagination.descending,
        sortBy: this.pagination.sortBy,
        skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        take: this.pagination.rowsPerPage,
      });

      this.countData = services.storageItemsCount;
      this.services = services.storageItems.map(
        (item) =>
          <StorageServiceItem>{
            id: item.id,
            type: item.type,
            content: JSON.parse(item.content) as StorageServiceItemContent,
          }
      );

      this.loading = false;
    },
  },
  async mounted() {
    await this.loadServicesContent();
  },
});
