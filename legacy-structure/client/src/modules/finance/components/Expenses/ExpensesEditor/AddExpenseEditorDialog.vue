<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="getTitle()"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <AddExpenseEditor
        :expenseToEdit="expenseToEdit"
        :close="() => onClose()"
        :showLoading="(value) => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { ExpenseRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddExpenseEditor from './AddExpenseEditor.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AddExpenseEditor,
    Dialog,
  },
})
export default class AddExpenseEditorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() expenseToEdit!: ExpenseRecord;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return this.expenseToEdit ? 'Edit expense' : 'Create expense';
  }
}
</script>
