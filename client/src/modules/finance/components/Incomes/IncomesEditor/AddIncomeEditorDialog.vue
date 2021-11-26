<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="getTitle()"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <AddIncomeEditor
        :incomeToEdit="incomeToEdit"
        :close="() => onClose()"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { IncomeRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddIncomeEditor from './AddIncomeEditor.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AddIncomeEditor,
    Dialog
  }
})
export default class AddIncomeEditorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() incomeToEdit!: IncomeRecord;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return this.incomeToEdit ? 'Edit income' : 'Create income';
  }
}
</script>
