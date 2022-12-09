<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="View product"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <ViewerProduct
        :product="product"
        :close="() => onClose()"
        :showLoading="(value) => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { ProductRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ViewerProduct from './ViewerProduct.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    ViewerProduct,
    Dialog,
  },
})
export default class ViewerProductDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop({ required: true }) product!: ProductRecord;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
