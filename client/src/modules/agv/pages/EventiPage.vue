<template>
  <q-page class="justify-evenly q-pa-md">
    <div class="row justify-center">
      <div
        class="row display-flex justify-between col-12 col-sm-10 col-md-9 q-pa-none"
      >
        <div class="col-12 col-md-8">
          <q-input
            outlined
            v-model="textSearch"
            standout="bg-primary text-white"
            label="Ricerca..."
            clearable
            @change="search"
          />
        </div>
        <div class="col-12 col-md-3">
          <q-select
            outlined
            standout="bg-primary text-white"
            v-model="filterClass"
            :options="options"
            label="Classe"
            @input="search"
          />
        </div>
      </div>
    </div>

    <ItemListComponent :items="filterItems" :onItemClick="onItemClick" />
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ItemListComponent from '../components/ItemListComponent/ItemListComponent.vue';
import { IItem, ITemType } from '../models/Item';
import { RawLocation } from 'vue-router';
import { DetailsEventsRoute } from '../settings/RouterSettings';
import { ItemService } from '../services/ContentService';
import { agvEventsActionsKeys, agvEventsNamespace } from '../store/AGVEvents';
import { Action } from 'vuex-class';
import { AgvEventResponseModel } from '../models/GraphqlModels';
@Component({
  components: {
    ItemListComponent
  }
})
export default class EventiPage extends Vue {
  @Action(agvEventsActionsKeys.agvGetEventByType, {
    namespace: agvEventsNamespace
  })
  loadItem!: (type: string) => Promise<AgvEventResponseModel[]>;
  private readonly ItemService: ItemService;
  items: AgvEventResponseModel[] = [];
  textSearch = '';
  filterClass = '';
  options: string[] = [];
  filterItems: AgvEventResponseModel[] = [];

  constructor() {
    super();
    this.ItemService = new ItemService();
  }

  async mounted() {
    this.items = await this.loadItem(ITemType.Event);
    let options: string[] = [];
    this.filterClass = '';
    this.items.forEach(element => {
      if (!options.includes(element.class)) {
        options.push(element.class);
        if (this.filterClass === '' || this.filterClass < element.class) {
          this.filterClass = element.class;
        }
      }
    });
    options = options.sort((a, b) => (a > b ? 1 : -1));

    this.options = ['Tutte'].concat(options);
    if (this.filterClass === '') {
      this.filterClass = 'Tutte';
    }
    this.search();
  }

  @Watch('textSearch')
  search() {
    const items = this.ItemService.searchEvents(
      this.textSearch,
      this.filterClass === 'Tutte' ? '' : this.filterClass,
      this.items
    );
    this.filterItems = items.filter(item => !!item && !!item.visible);
  }

  async onItemClick(item: IItem) {
    const location: RawLocation = {
      path: DetailsEventsRoute.path,
      query: {
        id: item.id.toString()
      }
    };
    await this.$router.push(location);
  }
}
</script>
