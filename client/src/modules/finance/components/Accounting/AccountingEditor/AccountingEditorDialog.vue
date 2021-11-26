<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Edit Accounting"
    :close="() => onClose()"
    styleDialog="width: 500px; max-width: 80vw"
  >
    <template slot="content">
      <AccountingEditor
        :close="close"
        :accounting="accounting"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { AccountRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AccountingEditor from './AccountingEditor.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AccountingEditor,
    Dialog
  }
})
export default class AccountingEditorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() accounting!: AccountRecord;

  showLoading = false;

  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
