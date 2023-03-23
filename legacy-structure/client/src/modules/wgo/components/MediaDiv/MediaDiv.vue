<template>
  <div v-if="!!image">
    <q-img class="bg-grey-1 rounded-borders" :src="image.url" :ratio="16 / 9" />
  </div>
</template>

<script lang="ts">
import { MediaResponseGql } from 'src/graphql';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class MediaDiv extends Vue {
  @Prop() image!: MediaResponseGql;
}
</script>
