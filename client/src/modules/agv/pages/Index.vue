<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <div class="q-pa-md">
        <h4 class="text-center">Assemblea Genitori Vezia</h4>
        <h5 class="text-center">BENVENUTI NEL VOSTRO NUOVO SITO</h5>

        <div class="row q-pt-lg">
          <div class="col">
            <p class="text-body1">
              Cari Bambini e Cari Genitori,
            </p>
            <p class="text-body1">
              qui troverere le informazioni sui prossimi appuntamenti,
              doposcuola ed eventi organizzati dal Comitato Genitori o dal
              nostro Comune.
            </p>
            <p class="text-body1">
              Venite a dare un’occhiata... stiamo lavorando per voi!
            </p>
          </div>
        </div>
        <div class="row justify-center q-py-lg">
          <div class="col-12">
            <PollBanner />
          </div>
        </div>
        <div class="row justify-center q-py-lg">
          <div
            v-if="
              !!pollData &&
                !!pollData.textBannerReedme &&
                !!pollData.textBannerReedme.title
            "
            class="col-12"
          >
            <BannerRules
              :banner="pollData.textBannerReedme"
              :title="pollData.textBannerReedme.title"
            />
          </div>
        </div>
      </div>

      <div class="row justify-center">
        <div v-if="!!corso" class="col-sm-8 col-md-6">
          <ItemCard
            title="Prossimo Corso"
            :item="corso"
            :onItemClick="item => onItemClick(item, false)"
          />
        </div>

        <div v-if="!!evento" class="col-sm-8 col-md-6">
          <ItemCard
            title="Prossimo Evento"
            :item="evento"
            :onItemClick="item => onItemClick(item, true)"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { IItem, ItemState, ITemType } from '../models/Item';
import { ItemService } from '../services/ContentService';
import { Vue, Component } from 'vue-property-decorator';
import ItemCard from '../components/ItemCard/ItemCard.vue';
import { RawLocation } from 'vue-router';
import {
  DetailsEventsRoute,
  DetailsCoursesRoute
} from '../settings/RouterSettings';
import PollComponent from '../components/PollComponent/PollComponent.vue';
import PollBanner from '../components/PollComponent/PollBanner.vue';
import BannerRules from '../components/BannerRules/BannerRules.vue';
import { AgvEventResponseModel } from '../models/GraphqlModels';
import { Action, Getter } from 'vuex-class';
import {
  agvEventsActionsKeys,
  agvEventsGettersKeys,
  agvEventsNamespace
} from '../store/AGVEvents';
import { PollService } from '../services';
import { IPoll } from '../models/Poll';

@Component({
  components: {
    ItemCard,
    PollComponent,
    PollBanner,
    BannerRules
  }
})
export default class HomePage extends Vue {
  @Action(agvEventsActionsKeys.agvAllEvents, { namespace: agvEventsNamespace })
  loadData!: () => Promise<AgvEventResponseModel[]>;
  @Getter(agvEventsGettersKeys.getAgvEvents, { namespace: agvEventsNamespace })
  eventList!: AgvEventResponseModel[];

  pollData: IPoll = <IPoll>{};

  corso?: AgvEventResponseModel = <AgvEventResponseModel>{};
  evento?: AgvEventResponseModel = <AgvEventResponseModel>{};
  idCorso = 1;
  idEvento = 4;

  private readonly itemService: ItemService;

  constructor() {
    super();
    this.itemService = new ItemService();
  }

  async onItemClick(item: IItem, isEvent: boolean) {
    const location: RawLocation = {
      path: isEvent ? DetailsEventsRoute.path : DetailsCoursesRoute.path,
      query: {
        id: item.id.toString()
      }
    };
    await this.$router.push(location);
  }

  filterItem(item: AgvEventResponseModel, now: Date) {
    if (!item.startDate) return false;
    const date = item.startDate
      .toString()
      .split('/')
      .reverse()
      .join('/');
    return (
      item.visible !== false &&
      item.state !== ItemState.Cancelled &&
      new Date(date) >= now
    );
  }

  async mounted() {
    const items = await this.loadData();
    const nowDate = new Date(Date.now());
    const validItems = items
      .filter(item => this.filterItem(item, nowDate))
      .sort((item1, item2) =>
        this.itemService.compareStrDate(item1.startDate, item2.startDate)
      );
    this.corso = validItems.find(
      item => (item as { type: string }).type === ITemType.Course
    );
    this.evento = validItems.find(
      item => (item as { type: string }).type === ITemType.Event
    );
    const pollService = new PollService();
    this.pollData = await pollService.getPollConfig();
  }
}
</script>

<style scoped>
p,
h5 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

h4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 32;
}
</style>
