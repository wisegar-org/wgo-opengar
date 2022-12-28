import { IssuesService } from "../../../services/Finance/IssuesService/IssuesService";
import { defineComponent, reactive, watch } from "vue";
import { IFinanceIssuesModel } from "../../../../../src/models/Finance";
import { getIssuesListSchema } from "./IssuesListSchema";
import { useTranslationStore } from "src/stores/translationStore";
import { TranslationStore } from "@wisegar-org/wgo-base-client/build/translation/store/TranslationStore";
import { ITablePagination } from "@wisegar-org/wgo-base-models/build/core/Table";
import Table from "@wisegar-org/wgo-base-client/build/core/components/Table/Table.vue";
import {
  BaseResizeComponent,
  BaseTranslateComponent,
} from "@wisegar-org/wgo-base-client/build/core/components/BaseComponents";
import { translationsFinanceIssues } from "../../../models/translations/finance";
import { translations as transBase } from "@wisegar-org/wgo-base-models/build/core/translations";
import { useAppFinanceFiltersStore } from "src/stores/appFinanceFiltersStore";

export default defineComponent({
  name: "IssuesList",
  components: {
    Table,
  },
  data() {
    const issues: IFinanceIssuesModel[] = [];
    const issuesCount = 0;
    const issuesService = new IssuesService();

    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;
    const { getLabel } = new BaseTranslateComponent();

    const schema = getIssuesListSchema(this.tranStore as any, [], []);
    // schema.rowDblClick
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

    const filterObj = reactive({
      labels: "",
      assignedTo: "",
      repository: "",
      minDate: "",
      maxDate: "",
      status: "",
    });

    watch(
      () => [filterObj],
      () => {
        this.loadIssues();
      },
      {
        deep: true,
      }
    );

    const statusOptions = [
      {
        value: 1,
        label: translationsFinanceIssues.COLUMN_STATUS_ACCOUNTED,
      },
      { value: 2, label: translationsFinanceIssues.COLUMN_STATUS_PENDING },
    ];

    return {
      issues,
      issuesCount,
      issuesService,
      schema,
      pagination,
      componentHeight,
      transBase,
      translationsFinanceIssues,
      filterObj,
      statusOptions,
      addResize,
      removeResize,
      resizeTable,
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    const financeFiltersStore = useAppFinanceFiltersStore();
    return {
      tranStore: tranStore.translationStore as TranslationStore,
      financeFiltersStore,
    };
  },
  methods: {
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    async loadIssues() {
      const result = await this.issuesService.loadIssuesPage({
        descending: this.pagination.descending,
        filter: {
          ...this.filterObj,
          status: (this.filterObj.status as any)?.value || 0,
        } as any,
        sortBy: this.pagination.sortBy,
        skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        take: this.pagination.rowsPerPage,
      });
      if (result) {
        this.issuesCount = result.issuesCount;
        this.issues = result.issues;
      }
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadIssues();
    },
    getStatusOptions() {
      return this.statusOptions.map((item: any) => ({
        value: item.value,
        label: this.getLabel(item.label),
      }));
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.financeFiltersStore.loadData();
  },
  unmounted() {
    this.removeResize(this.onResize);
  },
});
