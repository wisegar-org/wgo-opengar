<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Add Transaction"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <AddTransactionEditor
        :close="close"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddTransactionEditor from './AddTransactionEditor.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AddTransactionEditor,
    Dialog
  }
})
export default class AddTransactionEditorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
