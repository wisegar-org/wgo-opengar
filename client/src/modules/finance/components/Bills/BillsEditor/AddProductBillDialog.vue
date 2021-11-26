<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Config prodoct to bill"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <AddProductBill
        :products="products"
        :productBill="productBill"
        :close="() => onClose()"
        :showLoading="value => (showLoading = value)"
        :addProduct="addProduct"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { ProductRecord, ProductsBill } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddProductBill from './AddProductBill.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AddProductBill,
    Dialog
  }
})
export default class AddProductBillDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() productBill!: ProductsBill;
  @Prop() products!: ProductRecord;
  @Prop() addProduct!: (record: ProductsBill) => unknown;
  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
