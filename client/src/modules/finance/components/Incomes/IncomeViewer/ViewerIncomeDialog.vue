<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="View income"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <ViewerIncome
        :income="income"
        :close="() => onClose()"
        :showLoading="(value) => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { IncomeRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ViewerIncome from './ViewerIncome.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    ViewerIncome,
    Dialog,
  },
})
export default class ViewerIncomeDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop({ required: true }) income!: IncomeRecord;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
