import { defineComponent, reactive, watch } from "vue";
import NsLtMessageAdminEditor from "../NsLtMessageAdminEditor/NsLtMessageAdminEditor.vue";
import { AgvNewsletterMessageResponse } from "../../../../src/models/Newsletter";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core";
import { getNewsletterMessageListSchema } from "./NsLtMessageAdminComponentSchema";
import { translations } from "src/models/translations/newsletter";
import { NewsletterMessageService } from "src/services/Newsletter/NwLtMessengerService";
import { useNotifyStore } from "src/stores/notifyStore";
import { useTranslationStore } from "src/stores/translationStore";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { useAppContentStore } from "src/stores/appContentStore";
import Table from "@wisegar-org/wgo-base-client/build/core/components/Table/Table.vue";
import { AGVNewsletterMessageStatusEnum } from "src/models/Newsletter";
import { AGVNewslettersAdminPaths } from "src/router/paths/adminAgv/newslettersPaths";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import {
  ITableLeftButton,
  ITablePagination,
  ITableRowButton,
} from "@wisegar-org/wgo-base-models/build/core/Table";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";

export default defineComponent({
  name: "NsLtMessageAdminComponent",
  components: {
    Table,
    NsLtMessageAdminEditor,
  },
  props: {
    page: { type: Number, default: 0 },
  },
  data(vm) {
    const { getLabel } = new BaseTranslateComponent();
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const fnAction = (row?: AgvNewsletterMessageResponse) => {
      this.createMessage(
        row ||
          <AgvNewsletterMessageResponse>{
            title: "",
            id: 0,
            status: AGVNewsletterMessageStatusEnum.Waiting,
          }
      );
    };

    const rowBtns: ITableRowButton[] = [
      {
        icon: "edit",
        tooltip: transBase.EDIT,
        fnAction,
      },
      {
        icon: "send",
        tooltip: transBase.SEND,
        fnAction: (row: AgvNewsletterMessageResponse) => this.sendMessage(row),
      },
    ];

    const leftBtns: ITableLeftButton[] = [
      {
        label: transBase.ADD,
        icon: "add",
        color: "primary",
        tooltip: transBase.ADD,
        fnAction: () => fnAction(),
      },
    ];
    const schema = getNewsletterMessageListSchema(
      this.tranStore as any,
      leftBtns,
      rowBtns
    );
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
    const messages: any[] = [];

    const filterObj = reactive({
      title: "",
      status: "",
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

    const statusOptions = Object.values(AGVNewsletterMessageStatusEnum);

    return {
      filterObj: filterObj,
      messagesCount: 0,
      messages,
      pagination,
      loading: false,
      componentHeight,
      fnAction,
      addResize,
      removeResize,
      resizeTable,
      schema: schema,
      translations: translations,
      transBase,
      openDialog: false,
      statusOptions,
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
      newsletterService: new NewsletterMessageService(),
    };
  },
  setup(props, ctx) {
    const notifyStore = useNotifyStore();
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();
    const appContentStore = useAppContentStore();

    return {
      notifyStore,
      appStatusStore,
      appContentStore,
      tranStore: translationStore.translationStore as TranslationStore,
    };
  },
  methods: {
    async loadData() {
      const result = await this.newsletterService.getNewsletterMessagesPage({
        skip: this.pagination.rowsPerPage * (this.pagination.page - 1),
        take: this.pagination.rowsPerPage,
        descending: this.pagination.descending,
        sortBy: this.pagination.sortBy || "",
        filter: this.filterObj,
      });
      this.messages = result.messages;
      this.messagesCount = result.count;
      this.pagination.rowsNumber = result.count;
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadData();
    },
    createMessage(message: AgvNewsletterMessageResponse) {
      const routerService = new RouteService(this.$router as any);
      routerService.goTo(
        AGVNewslettersAdminPaths.newsletterMessagesEditor.path,
        {
          id: message?.id || 0,
          page: this.pagination.page || 0,
        }
      );
    },
    sendMessage(message: AgvNewsletterMessageResponse) {
      this.$q
        .dialog({
          title: this.getLabel(this.transBase.CONFIRM),
          message: this.getLabel(this.translations.MSG_SEND_MESSAGE_MSG),
          style: "width: 100%",
          persistent: true,
          focus: "cancel",
          ok: {
            color: "primary",
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
          if (await this.newsletterService.sendNewsletterMessage(message.id)) {
            await this.loadData();
            this.notifyStore.setNotify({
              message: this.getLabel(
                this.translations.MSG_SEND_MESSAGE_SUCCESS
              ),
              type: "positive",
              position: "top",
            });
          }
        });
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
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
