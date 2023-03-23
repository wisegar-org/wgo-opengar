<template>
  <q-card
    flat
    bordered
    class="row q-py-md cursor-pointer"
    style="min-height: 480px; align-content: space-between;
    justify-content: space-evenly; text-align: center;"
    clickable @click="goToPath"
  >
    <div class="col-12">
      <q-card-section>
        <div class="flex justify-center">
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

      <q-card-section>
        <div>{{ name }}</div>
        <div class="q-pt-none text-grey-7" v-html="getDescription()" />
      </q-card-section>
    </div>
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
export default class ModuleCard extends Vue {
  @Prop() image!: MediaResponseGql;
  @Prop() icon!: string;
  @Prop() name!: string;
  @Prop() description!: string;
  @Prop() path!: string;
  @Prop() labelBtn!: string;

  avatarSize = '170px';
  
  goToPath() {
    if (this.$route.path !== this.path) {
      window.open(this.path, '_blank')
      // void this.$router.push(this.path);
    }
  }

  getDescription() {
    return minText(this.description, 300, 3);
  }
}
</script>
