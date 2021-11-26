<template>
  <div>
    <div class="q-ma-lg">
      <FilterSelect
        :clearable="false"
        label="Product"
        :options="products"
        filterProp="name"
        @onChange="value => setProducts(value)"
        :value="productInBill.product"
      />
    </div>
    <q-input
      v-if="productInBill.productId"
      square
      outlined
      class="q-ma-lg"
      :value="productInBill.product.sellPrice"
      type="number"
      label="Sell Price"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="productInBill.count"
      :prefix="getPrefixCount()"
      :suffix="getSuffixCount()"
      type="number"
      label="Count"
      dense
      :rules="[
        val => val > 0 || '* Required',
        val =>
          productInBill.type !== 1 ||
          val <= productInBill.maxCount ||
          `Max count: ${productInBill.maxCount}`
      ]"
    />
    <q-card-actions align="right" class="text-primary">
      <q-btn
        unelevated
        color="primary"
        align="around"
        :disable="!isValid()"
        class="btn-fixed-width btn_width"
        @click="() => addProductToBillClick()"
        :label="isUpdateBill ? 'Update' : 'Add'"
      />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { ProductRecord, ProductsBill } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import MediaListEditor from '../../../../wgo/components/MediaList/MediaListEditor.vue';
import FilterSelect from '../../FilterSelect.vue';

@Component({
  components: {
    MediaListEditor,
    FilterSelect
  }
})
export default class AddProductBill extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() productBill!: ProductsBill;
  @Prop() products!: ProductRecord;
  @Prop() addProduct!: (record: ProductsBill) => unknown;

  productInBill: ProductsBill;
  isUpdateBill: boolean;

  constructor() {
    super();
    this.isUpdateBill = !!this.productBill;
    this.productInBill = this.isUpdateBill
      ? { ...this.productBill }
      : <ProductsBill>{
          productId: 0,
          count: 0,
          maxCount: 0,
          remove: false,
          type: 1
        };
  }

  getPrefixCount() {
    return this.productInBill.type === 1 ? 'No. units' : 'No. hours';
  }
  getSuffixCount() {
    return this.productInBill.type === 1 && this.productInBill.maxCount
      ? `of ${this.productInBill.maxCount}`
      : '';
  }

  setProducts(record: ProductRecord) {
    this.productInBill.productId = record.id;
    this.productInBill.product = record;
    this.productInBill.type = record.type;
    this.productInBill.maxCount = record.unitCount;
    this.productInBill.price = record.sellPrice;
  }

  isValid() {
    return this.productInBill.productId && this.productInBill.count;
  }

  addProductToBillClick() {
    if (!!this.addProduct) {
      this.addProduct(this.productInBill);
    }
  }
}
</script>
