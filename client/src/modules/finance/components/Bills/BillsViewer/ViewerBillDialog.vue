<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="View bill"
    :close="() => onClose()"
    styleDialog="width: 600px; max-width: 80vw"
  >
    <template slot="content">
      <ViewerBill
        :bill="bill"
        :close="() => onClose()"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { BillRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ViewerBill from './ViewerBill.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    ViewerBill,
    Dialog
  }
})
export default class ViewerBillDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop({ required: true }) bill!: BillRecord;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
