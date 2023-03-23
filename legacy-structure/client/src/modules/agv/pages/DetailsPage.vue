<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10 q-pa-md">
      <div>
        <div v-if="imgList.length === 1">
          <q-img
            height="min(700px,50vw);"
            class="bg-grey-1 rounded-borders"
            :src="imgList[0]"
          />
        </div>
        <q-carousel
          v-else-if="showCarousel()"
          animated
          v-model="slide"
          :arrows="showArrow()"
          :navigation="showArrow()"
          infinite
          control-type="unelevated"
          control-color="primary"
          height="calc(min(700px,50vw))"
          class="bg-grey-1 rounded-borders"
        >
          <q-carousel-slide
            class="q-pa-none"
            v-for="(slide, index) in imgList"
            :key="index"
            :name="index"
            :img-src="slide"
          >
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="block-text-card">
        <h4>{{ item.title }}</h4>
        <h5>Anno scolastico: {{ item.class }}</h5>
        <p class="text-body1" v-html="item.description"></p>
      </div>
      <ContactInscriptionFrom v-if="enrollment" :event="item" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { ItemState } from '../models/Item';
import { ItemService } from '../services/ContentService';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ContactInscriptionFrom from '../components/Contact/ContactInscriptionForm.vue';
import { Action } from 'vuex-class';
import { agvEventsActionsKeys, agvEventsNamespace } from '../store/AGVEvents';
import { AgvEventResponseModel } from '../models/GraphqlModels';

@Component({
  components: {
    ContactInscriptionFrom
  }
})
export default class DetailsPage extends Vue {
  @Prop() itemId!: number;
  item: AgvEventResponseModel = <AgvEventResponseModel>{};
  slide = 1;
  nameCourse = '';
  enrollment = false;
  path = location.origin;
  imgList: string[] = [];

  @Action(agvEventsActionsKeys.agvGetEvent, { namespace: agvEventsNamespace })
  loadItem!: (id: number) => Promise<AgvEventResponseModel>;

  private readonly itemService: ItemService;

  constructor() {
    super();
    this.itemService = new ItemService();
  }

  showArrow(): boolean {
    return !!this.imgList && this.imgList.length > 1;
  }

  showCarousel(): boolean {
    return !!this.imgList && this.imgList.length > 0;
  }

  @Watch('item')
  setItemList() {
    this.imgList = this.item.imgList
      ? this.item.imgList.filter(img => !!img.url).map(img => img.url || '')
      : [];
  }

  async created() {
    this.item = await this.loadItem(parseInt(this.itemId.toString()));

    if (this.item) {
      this.item.enrollment =
        this.itemService.compareStrDate(
          this.item.startDate,
          new Date(Date.now())
        ) < 0 || this.item.state === ItemState.Cancelled
          ? false
          : this.item.enrollment;
    }
    this.enrollment =
      this.item && !!this.item.enrollment.toString()
        ? !!this.item.enrollment
        : true;
    this.nameCourse = this.item ? this.item.title : '-';
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
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 32;
}

.block-text-card {
  padding-top: 3rem;
  padding-bottom: 1rem;
}
</style>
