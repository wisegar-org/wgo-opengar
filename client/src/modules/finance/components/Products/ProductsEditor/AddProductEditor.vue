<template>
  <div>
    <q-input
      square
      outlined
      class="q-mx-md q-mb-lg q-mt-md"
      v-model="product.name"
      label="Name"
      :autofocus="true"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="product.description"
      label="Description"
      autogrow
      dense
    />
    <div v-if="!isUpdateProduct" class="q-mx-md q-my-lg">
      <FilterSelect
        :clearable="false"
        label="Type"
        :options="typeOptions"
        filterProp="label"
        :value="productType"
        @onChange="
          value => {
            setType(value);
          }
        "
      />
    </div>
    <q-input
      v-else
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="productType.label"
      label="Type"
      readonly
      dense
    />
    <q-input
      v-if="productType.value === 1"
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="product.buyPrice"
      type="number"
      label="Buy Price"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="product.sellPrice"
      type="number"
      label="Sell Price"
      dense
    />
    <q-input
      v-if="productType.value === 1"
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="product.unitCount"
      type="number"
      label="Unit Count"
      dense
    />
    <MediaListEditor
      :items="product.docs"
      :addItems="
        items => {
          docsToAdd = items;
        }
      "
      title="Bild documents"
      :changeValue="() => {}"
      :showLoading="showLoading"
    />
    <q-card-section
      class="row items-center justify-center text-primary q-mt-md"
    >
      <q-btn
        unelevated
        color="primary"
        align="center"
        :disable="!isValid()"
        class="col-12 col-sm-auto"
        @click="() => addProductClick()"
        :label="isUpdateProduct ? 'Update' : 'Create'"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Action } from 'vuex-class';
import { ProductRecord } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { githubActions, githubNamespace } from '../../../store';

import MediaListEditor from '../../../../wgo/components/MediaList/MediaListEditor.vue';
import FilterSelect from '../../FilterSelect.vue';
import {
  getProductTypeOptions,
  getProductTypeString
} from '../../../models/parsers';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';

@Component({
  components: {
    MediaListEditor,
    FilterSelect
  }
})
export default class AddProductEditor extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() productToEdit!: ProductRecord;

  @Action(githubActions.addProduct, { namespace: githubNamespace })
  addProduct!: (record: ProductRecord) => Promise<boolean>;
  @Action(githubActions.updateProduct, { namespace: githubNamespace })
  updateProduct!: (record: ProductRecord) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  product: ProductRecord;
  isUpdateProduct: boolean;
  docsToAdd: number[] = [];
  typeOptions = getProductTypeOptions();
  productType: { value: number; label: string };

  constructor() {
    super();
    this.isUpdateProduct = !!this.productToEdit;
    this.product = this.isUpdateProduct
      ? this.productToEdit
      : <ProductRecord>{
          id: 0,
          name: '',
          description: '',
          buyPrice: 0,
          sellPrice: 0,
          unitCount: 0,
          type: 1,
          docs: []
        };
    this.productType = {
      value: this.product.type,
      label: getProductTypeString(this.product.type)
    };
  }

  setType(value: { value: number; label: string }) {
    this.productType = value;
  }

  isValid() {
    return (
      !!this.product.name &&
      !!this.product.sellPrice &&
      (this.product.buyPrice || this.productType.value !== 1) &&
      (this.product.unitCount || this.productType.value !== 1)
    );
  }

  async addProductClick() {
    this.showLoading(true);
    const result = this.isUpdateProduct
      ? await this.updateProduct(<ProductRecord>{
          id: this.productToEdit.id,
          name: this.product.name,
          description: this.product.description,
          buyPrice: this.product.type === 1 ? this.product.buyPrice : 0,
          sellPrice: this.product.sellPrice,
          type: this.productType.value,
          unitCount: this.product.type === 1 ? this.product.unitCount : 0,
          docs: this.docsToAdd
        })
      : await this.addProduct(<ProductRecord>{
          name: this.product.name,
          description: this.product.description,
          buyPrice: this.product.type === 1 ? this.product.buyPrice : 0,
          sellPrice: this.product.sellPrice,
          type: this.productType.value,
          unitCount: this.product.type === 1 ? this.product.unitCount : 0,
          docs: this.docsToAdd
        });
    this.showLoading(false);
    if (result) {
      this.notify({
        message: `Product ${
          this.isUpdateProduct ? 'updated' : 'created'
        } successfully`,
        type: 'positive'
      });
      if (!!this.close) {
        this.close();
      }
    }
  }
}
</script>
