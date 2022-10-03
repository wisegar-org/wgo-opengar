import { IssuesService } from "../../../services/Finance/IssuesService/IssuesService";
import { defineComponent } from "vue";
import { IFinanceIssuesModel } from "../../../../../src/models/Finance";
import { getIssuesListSchema } from "./IssuesListSchema";
import { useTranslationStore } from "src/stores/translationStore";
import { TranslationStore } from "src/wgo-base/translation/models/TranslationStore";
import { ITablePagination } from "src/wgo-base/core/models/Table";
import Table from "../../../wgo-base/core/components/Table/Table.vue";
import { BaseResizeComponent } from "src/wgo-base/core/components/BaseComponents";

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

    return {
      issues,
      issuesCount,
      issuesService,
      schema,
      pagination,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
    };
  },
  setup() {
    const tranStore = useTranslationStore();
    return {
      tranStore: tranStore.translationStore as TranslationStore,
    };
  },
  methods: {
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    async loadIssues() {
      const result = await this.issuesService.loadIssuesPage({
        descending: this.pagination.descending,
        filter: {} as any,
        sortBy: this.pagination.sortBy,
        skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        take: this.pagination.rowsPerPage,
      });
      if (result && result.issuesCount) {
        this.issuesCount = result.issuesCount;
        this.issues = result.issues;
      }
    },
    async getDataByConfig(pagination: ITablePagination) {
      this.pagination = pagination;
      await this.loadIssues();
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    // await this.loadIssues();
  },
  unmounted() {
    this.removeResize(this.onResize);
  },
});
