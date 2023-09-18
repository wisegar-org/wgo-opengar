import { IItem } from "src/models/Item";
import { AgvEventResponseModel } from "src/models/models";
import { AGVDetailsPaths } from "src/router/paths/detailsPath";
import { AGVPollPaths } from "src/router/paths/pollPaths";
import { EventService } from "src/services/Event/EventService";
import { useAppContentStore } from "src/stores/appContentStore";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import { defineComponent } from "vue";
import TextVue from "@wisegar-org/wgo-base-client/build/core/components/Text/Text.vue";
import BannerComponent from "../BannerComponent/BannerComponent.vue";
import ItemCard from "../ItemCard/ItemCard.vue";
import { Router } from "vue-router";

export default defineComponent({
  name: "HomeComponent",
  components: {
    TextVue,
    ItemCard,
    BannerComponent,
  },
  data() {
    const corso: AgvEventResponseModel | undefined = <AgvEventResponseModel>{};
    const evento: AgvEventResponseModel | undefined = <AgvEventResponseModel>{};
    const routerService = new RouteService(this.$router as Router);
    return {
      corso,
      evento,
      loadingEvents: false,
      routerService,
      pullPath: AGVPollPaths.pollData.path,
      rulesPath: AGVPollPaths.pollRules.path,
    };
  },
  setup() {
    const appContentStore = useAppContentStore();
    return {
      appContentStore,
    };
  },
  methods: {
    async onItemClick(item: IItem, isEvent: boolean) {
      const location = {
        path: isEvent
          ? AGVDetailsPaths.eventiDetails.path
          : AGVDetailsPaths.corsiDetails.path,
        query: {
          id: item.id.toString(),
        },
      };
      this.routerService.goTo(location.path, location.query);
      // await this.$router.push(location);
    },
  },
  async created() {
    await this.appContentStore.loadPollData();

    this.loadingEvents = true;
    const eventService = new EventService();
    const nextsEvents = await eventService.getNextEvents();
    this.corso = nextsEvents.corso as AgvEventResponseModel;
    this.evento = nextsEvents.evento as AgvEventResponseModel;
    this.loadingEvents = false;
  },
});
