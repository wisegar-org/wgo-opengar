<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Issue Detail"
    :close="() => onClose()"
    styleDialog="width: 500px; max-width: 80vw"
  >
    <template slot="content">
      <IssueDetails
        :issue="issue"
        :close="() => onClose()"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { IssuesRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import IssueDetails from './IssueDetails.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    IssueDetails,
    Dialog
  }
})
export default class IssueDetailsDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() issue!: IssuesRecord;

  showLoading = false;

  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
