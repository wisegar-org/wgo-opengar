<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="View transaction"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <ViewerTransaction
        :transaction="transaction"
        :close="() => onClose()"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { TransactionRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ViewerTransaction from './ViewerTransaction.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    ViewerTransaction,
    Dialog
  }
})
export default class ViewerTransactionDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop({ required: true }) transaction!: TransactionRecord;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
