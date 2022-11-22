import { defineComponent } from "vue";
import { translations } from "../../models/translations/events";
import Table from "../../wgo-base/core/components/Table/Table.vue";
import Loader from "../../wgo-base/core/components/Loader/Loader.vue";
import { useTranslationStore } from "src/stores/translationStore";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "src/wgo-base/core/components/BaseComponents";
import {
  ITableLeftButton,
  ITablePagination,
  ITableRowButton,
} from "src/wgo-base/core/models/Table";
import { EventService } from "src/services/Event/EventService";
import { getEventListSchema } from "./EventAdminComponentSchema";
import {
  EventClassOption,
  EventEnrollmentOptions,
  EventStateOptions,
  EventTypeOptions,
  EventVisibleOptions,
} from "src/models/Events";

export default defineComponent({
  name: "EventAdminComponent",
  components: {
    Table,
    Loader,
  },
  data() {
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const rowBtns: ITableRowButton[] = [];

    const leftBtns: ITableLeftButton[] = [];
    const { getLabel } = new BaseTranslateComponent();
    const schema = getEventListSchema(this.tranStore as any, leftBtns, rowBtns);
    schema.rowsPerPage = this.$q.platform.is.mobile
      ? [5, 10, 20, 0]
      : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];
    const pagination: ITablePagination = {
      descending: false,
      page: 1,
      rowsPerPage: schema.rowsPerPageDefault,
      sortBy: "",
    } as ITablePagination;
    const events: any[] = [];

    const typeOptions = EventTypeOptions;
    const stateOptions = EventStateOptions;
    const classOptions = EventClassOption;
    const enrollmentOptions = EventEnrollmentOptions;
    const visibleOptions = EventVisibleOptions;

    return {
      eventsCount: 0,
      events,
      pagination,
      filterObj: {
        class: "",
        state: "",
        title: "",
        type: "",
        enrollment: "",
        visible: "",
      },
      loading: false,
      componentHeight,
      typeOptions,
      stateOptions,
      classOptions,
      enrollmentOptions,
      visibleOptions,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations: translations,
      id_input: "upload-button-" + Math.random().toString(36).substring(2, 10),
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
    };
  },
  setup() {
    const translationStore = useTranslationStore();
    return {
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    async loadData() {
      const eventService = new EventService();
      const result = await eventService.allEventsByPage({
        skip: this.pagination.rowsPerPage * (this.pagination.page - 1),
        take: this.pagination.rowsPerPage,
        descending: this.pagination.descending,
        sortBy: this.pagination.sortBy || "",
        filter: this.filterObj,
      });
      if (result && result.count) {
        this.eventsCount = result.count;
        this.events = result.events || [];
      }
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadData();
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
});
