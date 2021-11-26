<template>
  <q-card flat bordered style="min-height:250px;" class="text-center">
    <q-card-section class="q-pb-none">
      <div>{{ title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none text-grey-7" v-html="getDescription()">
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { minText } from './Utils';

@Component({})
export default class SimpleCard extends Vue {
  @Prop() title!: string;
  @Prop() description!: string;

  getDescription() {
    return minText(this.description, 380, 3);
  }
}
</script>
