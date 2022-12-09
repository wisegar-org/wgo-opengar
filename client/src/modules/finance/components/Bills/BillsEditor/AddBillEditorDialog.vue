<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="getTitle()"
    :close="() => onClose()"
    styleDialog="width: 800px; max-width: 90vw"
  >
    <template slot="content">
      <AddBillEditor
        :billToEdit="billToEdit"
        :close="() => onClose()"
        :showLoading="(value) => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { BillRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddBillEditor from './AddBillEditor.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AddBillEditor,
    Dialog,
  },
})
export default class AddBillEditorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() billToEdit!: BillRecord;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return this.billToEdit ? 'Edit bill' : 'Create bill';
  }
}
</script>
