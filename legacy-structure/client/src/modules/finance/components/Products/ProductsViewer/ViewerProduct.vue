<template>
  <div>
    <q-input
      square
      outlined
      class="q-mx-md q-mb-lg q-mt-md"
      v-model="product.name"
      label="Name"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="product.description"
      label="Description"
      autogrow
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="type"
      label="Type"
      readonly
      dense
    />
    <q-input
      v-if="product.type === 1"
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="product.buyPrice"
      type="number"
      label="Buy Price"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="product.sellPrice"
      type="number"
      label="Sell Price"
      readonly
      dense
    />
    <q-input
      v-if="product.type === 1"
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="product.unitCount"
      type="number"
      label="Unit Count"
      readonly
      dense
    />
    <MediaListViewer
      v-if="!!product.docs && product.docs.length > 0"
      title="Bild documents"
      :items="product.docs"
      :showLoading="showLoading"
    />

    <q-card-section
      align="right"
      class="row items-center justify-center text-primary"
    >
      <q-btn
        unelevated
        color="primary"
        align="center"
        class="col-12 col-sm-auto"
        @click="() => close()"
        label="Close"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { ProductRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import MediaListViewer from '../../../../wgo/components/MediaList/MediaListViewer.vue';
import { getProductTypeString } from '@wisegar-org/wgo-base-models/build/parsers';

@Component({
  components: {
    MediaListViewer,
  },
})
export default class ViewerProduct extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop({ required: true }) product!: ProductRecord;

  type: string;

  constructor() {
    super();
    this.type = getProductTypeString(this.product.type);
  }
}
</script>
