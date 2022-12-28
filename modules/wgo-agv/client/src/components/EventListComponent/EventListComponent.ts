import { IItem } from "src/models/Item";
import { AgvEventResponseModel } from "src/models/models";
import { defineComponent, reactive, ref, watch } from "vue";
import { EventService } from "../../services/Event/EventService";
import ItemListComponent from "../ItemListComponent/ItemListComponent.vue";

export default defineComponent({
  name: "EventListComponent",
  props: {
    eventType: {
      type: String,
      required: true,
    },
    detailPath: {
      type: String,
      required: true,
    },
  },
  components: {
    ItemListComponent,
  },
  data(vm) {
    const items: AgvEventResponseModel[] = [];
    const textSearch = ref("");
    const filterClass = ref("");
    const options: string[] = [];
    const loading = false;
    const pagination = reactive({
      rowsPerPage: 5,
      descending: true,
      page: 1,
      sortBy: "startDate",
      rowsNumber: 0,
      max: 1,
    });

    watch(
      pagination,
      () => {
        this.loadData();
      },
      { deep: true }
    );

    return {
      items,
      textSearch,
      filterClass,
      options,
      loading,
      pagination,
      eventService: new EventService(),
    };
  },
  methods: {
    async loadData() {
      if (!this.filterClass) return true;
      this.loading = true;
      const arg = {
        skip: this.pagination.rowsPerPage * (this.pagination.page - 1),
        take: this.pagination.rowsPerPage,
        descending: this.pagination.descending,
        sortBy: this.pagination.sortBy || "",
        filter: {
          title: this.textSearch,
          class: this.filterClass !== "Tutte" ? this.filterClass : "",
          visible: "true",
          type: this.eventType,
        },
      };
      const result = await this.eventService.allEventsByPage(arg);
      this.pagination.rowsNumber = result.count;
      const pages = Math.floor(result.count / this.pagination.rowsPerPage);
      this.pagination.max =
        result.count % this.pagination.rowsPerPage === 0 ? pages : pages + 1;
      this.items = result.events;
      this.loading = false;
    },
    async onItemClick(item: IItem) {
      const location = {
        path: this.detailPath,
        query: {
          id: item.id.toString(),
        },
      };
      await this.$router.push(location);
    },
  },
  async created() {
    this.loading = true;
    await this.loadData();
    let options: string[] = await this.eventService.allEventClass(
      this.eventType
    );
    this.options = ["Tutte"].concat(options);
    this.filterClass = this.options[this.options.length - 1];
  },
  watch: {
    textSearch() {
      this.loadData();
    },
    filterClass() {
      this.loadData();
    },
  },
});
