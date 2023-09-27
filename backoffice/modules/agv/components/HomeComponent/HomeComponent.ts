import TextVue from "@wisegar-org/wgo-base-client/build/core/components/Text/Text.vue";
import { RouteService } from "@wisegar-org/wgo-base-client/build/core/services/RouteService";
import BannerComponent from "../../../../src/components/BannerComponent/BannerComponent.vue";
import ItemCard from "../../../../src/components/ItemCard/ItemCard.vue";
import { IItem } from "../../../../src/models/Item";
import { AgvEventResponseModel } from "../../../../src/models/models";
import { AGVDetailsPaths } from "../../../../src/router/paths/detailsPath";
import { AGVPollPaths } from "../../../../src/router/paths/pollPaths";
import { EventService } from "../../../../src/services/Event/EventService";
import { useAppContentStore } from "../../../../src/stores/appContentStore";
import { Ref, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeComponent",
  components: {
    TextVue,
    ItemCard,
    BannerComponent,
  },
  setup() {
    const router = useRouter();
    const refLoading: Ref<boolean> = ref(false);
    const refCorso: Ref<AgvEventResponseModel | undefined> = ref(
      <AgvEventResponseModel>{}
    );
    const refEvento: Ref<AgvEventResponseModel | undefined> = ref(
      <AgvEventResponseModel>{}
    );
    const routerService = new RouteService(router);
    const appContentStore = useAppContentStore();

    const funOnItemClick = (item: IItem, isEvent: boolean) => {
      const location = {
        path: isEvent
          ? AGVDetailsPaths.eventiDetails.path
          : AGVDetailsPaths.corsiDetails.path,
        query: {
          id: item.id.toString(),
        },
      };
      routerService.goTo(location.path, location.query);
    };

    onMounted(async () => {
      refLoading.value = true;
      await appContentStore.loadPollData();
      const eventService = new EventService();
      const nextsEvents = await eventService.getNextEvents();
      refCorso.value = nextsEvents.corso as AgvEventResponseModel;
      refEvento.value = nextsEvents.evento as AgvEventResponseModel;
      refLoading.value = false;
    });
    return {
      appContentStore,
      refCorso,
      refEvento,
      refLoading,
      routerService,
      pullPath: AGVPollPaths.pollData.path,
      rulesPath: AGVPollPaths.pollRules.path,
      funOnItemClick,
    };
  },
});
