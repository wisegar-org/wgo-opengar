import { IItem } from "src/models/Item";
import { AgvEventResponseModel } from "src/models/models";
import { IPoll } from "src/models/Poll";
import { AGVDetailsPaths } from "src/router/paths/detailsPath";
import { AGVPollPaths } from "src/router/paths/pollPaths";
import { EventService } from "src/services/Event/EventService";
import { PollService } from "src/services/PollService";
import { RouteService } from "src/wgo-base/core/services/RouteService";
import { defineComponent } from "vue";
import Text from "../../wgo-base/core/components/Text/Text.vue";
import BannerComponent from "../BannerComponent/BannerComponent.vue";
import ItemCard from "../ItemCard/ItemCard.vue";

export default defineComponent({
  name: "HomeComponent",
  components: {
    Text,
    ItemCard,
    BannerComponent,
  },
  data() {
    const pollService = new PollService();
    const pollData: IPoll = <IPoll>{};
    const corso: AgvEventResponseModel | undefined = <AgvEventResponseModel>{};
    const evento: AgvEventResponseModel | undefined = <AgvEventResponseModel>{};
    const routerService = new RouteService(this.$router as any);
    return {
      corso,
      evento,
      pollService,
      pollData,
      loadingEvents: false,
      routerService,
      pullPath: AGVPollPaths.pollData.path,
      rulesPath: AGVPollPaths.pollRules.path,
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
    this.pollData = await this.pollService.getPollConfig();

    this.loadingEvents = true;
    const eventService = new EventService();
    const nextsEvents = await eventService.getNextEvents();
    this.corso = nextsEvents.corso as any;
    this.evento = nextsEvents.evento as any;
    this.loadingEvents = false;
  },
});
