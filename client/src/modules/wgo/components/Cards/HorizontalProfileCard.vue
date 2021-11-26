<template>
  <q-card
    flat
    bordered
    class="row q-py-md"
    style="align-content: space-between;
    justify-content: space-evenly; text-align: center;"
  >
    <div
      class="col-5 flex"
      style="height:350px; align-content: center;
    justify-content: center; align-self: center"
    >
      <q-card-section>
        <div class="flex justify-center self-center">
          <q-avatar v-if="!!image && !!image.url" :size="avatarSize">
            <q-img
              class="bg-grey-1 rounded-borders"
              :src="image.url"
              :ratio="1"
            />
          </q-avatar>
          <q-avatar v-else color="primary" :icon="icon" :size="avatarSize" />
        </div>
      </q-card-section>
    </div>
    <q-card-section
      class="col-12 col-sm-7 row align-content: space-between; q-mt-sm q-mb-lg"
    >
      <div class="col-12" style="height: 100%;">
        <div>{{ name }}</div>
        <div class="text-grey-7" v-html="getDescription()" />
      </div>
      <div class="col-12 q-pb-lg">
        <a :href="getMailTo()" target="_blank"> {{ email }} </a>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { MediaResponseGql } from 'src/graphql';
import { Vue, Component, Prop } from 'vue-property-decorator';
import MediaDiv from '../MediaDiv/MediaDiv.vue';
import { minText } from './Utils';

@Component({
  components: {
    MediaDiv
  }
})
export default class HorizontalProfileCard extends Vue {
  @Prop() image!: MediaResponseGql;
  @Prop() icon!: string;
  @Prop() name!: string;
  @Prop() description!: string;
  @Prop() email!: string;

  avatarSize = '270px';

  getMailTo() {
    return `mailto:${this.email}`;
  }

  getDescription() {
    return minText(this.description, 1500, 3);
  }
}
</script>
