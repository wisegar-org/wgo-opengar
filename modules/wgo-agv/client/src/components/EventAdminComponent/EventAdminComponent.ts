import { defineComponent, reactive, watch } from "vue";
import { translations } from "../../models/translations/events";
import Table from "../../wgo-base/client/core/components/Table/Table.vue";
import Loader from "../../wgo-base/client/core/components/Loader/Loader.vue";
import { useTranslationStore } from "src/stores/translationStore";
import { EventService } from "src/services/Event/EventService";
import { getEventListSchema } from "./EventAdminComponentSchema";
import {
  EventClassOption,
  EventEnrollmentOptions,
  EventStateOptions,
  EventTypeOptions,
  EventVisibleOptions,
} from "src/models/Events";
import { translations as transBase } from "src/wgo-base/models/core";
import { AgvEventResponseModel } from "src/models/models";
import { AGVEventsAdminPaths } from "src/router/paths/adminAgv/eventsPaths";
import { useAppStatusStore } from "src/stores/appStatusStore";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "src/wgo-base/client/core/components/BaseComponents";
import {
  ITableLeftButton,
  ITablePagination,
  ITableRowButton,
} from "src/wgo-base/models/core/Table";
import { RouteService } from "src/wgo-base/client/core/services/RouteService";
import { TranslationStore } from "src/wgo-base/client/translation/store/TranslationStore";

export default defineComponent({
  name: "EventAdminComponent",
  components: {
    Table,
    Loader,
  },
  props: {
    page: { type: Number, default: 0 },
  },
  data() {
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const fnAction = (row?: AgvEventResponseModel) => {
      this.editEvent(row?.id || 0);
    };

    const rowBtns: ITableRowButton[] = [
      {
        icon: "edit",
        tooltip: transBase.EDIT,
        fnAction,
      },
    ];

    const leftBtns: ITableLeftButton[] = [
      {
        label: "",
        icon: "add",
        color: "primary",
        tooltip: transBase.ADD,
        fnAction: () => fnAction(),
      },
    ];
    const { getLabel } = new BaseTranslateComponent();
    const schema = getEventListSchema(this.tranStore as any, leftBtns, rowBtns);
    schema.rowDblClick = fnAction;
    schema.rowsPerPage = this.$q.platform.is.mobile
      ? [5, 10, 20, 0]
      : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = schema.rowsPerPage[1];
    const pagination: ITablePagination = {
      descending: false,
      page: this.page || 1,
      rowsPerPage: schema.rowsPerPageDefault,
      sortBy: "",
    } as ITablePagination;
    const events: any[] = [];

    const typeOptions = EventTypeOptions;
    const stateOptions = EventStateOptions;
    const classOptions = EventClassOption;
    const enrollmentOptions = EventEnrollmentOptions;
    const visibleOptions = EventVisibleOptions;

    const routeService = new RouteService(this.$router as any);
    const self = this;

    const filterObj = reactive({
      class: "",
      state: "",
      title: "",
      type: "",
      enrollment: "",
      visible: "",
    });

    watch(
      () => [filterObj],
      () => {
        this.loadData();
      },
      {
        deep: true,
      }
    );

    return {
      filterObj: filterObj,
      eventsCount: 0,
      events,
      pagination,
      loading: false,
      componentHeight,
      typeOptions,
      stateOptions,
      classOptions,
      enrollmentOptions,
      visibleOptions,
      routeService,
      fnAction,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations: translations,
      openDialog: false,
      id_input: "upload-button-" + Math.random().toString(36).substring(2, 10),
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
    };
  },
  setup() {
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();

    return {
      appStatusStore,
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
      if (result && result.events) {
        this.eventsCount = result.count;
        this.events = result.events || [];
      }
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadData();
    },
    editEvent(idEvent: number) {
      this.appStatusStore.setLoading(true);
      this.routeService.goTo(AGVEventsAdminPaths.eventEditor.path, {
        event: idEvent,
        page: this.pagination.page,
      });
    },
    onClose(success: boolean) {
      this.openDialog = false;
      if (success) this.loadData();
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
