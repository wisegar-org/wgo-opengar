<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="getTitle()"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <AddProductEditor
        :productToEdit="productToEdit"
        :close="() => onClose()"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { ProductRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddProductEditor from './AddProductEditor.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AddProductEditor,
    Dialog
  }
})
export default class AddProductEditorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() productToEdit!: ProductRecord;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return this.productToEdit ? 'Edit product' : 'Create product';
  }
}
</script>
