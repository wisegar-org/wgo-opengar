<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Print Accounting"
    :close="() => onClose()"
    :fullWidth="true"
  >
    <template slot="content">
      <AccountingStepper
        :close="close"
        :showLoading="value => (showLoading = value)"
        :collaborator="collaborator"
        :filterIssues="filterIssues"
        :organizationData="organizationData"
        :initDate="initDate"
        :endDate="endDate"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  CollaboratorRecord,
  IssuesRecord,
  OrganizationDataRecord
} from '../../../models/models';
import AccountingStepper from './AccountingStepper.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AccountingStepper,
    Dialog
  }
})
export default class AccountingStepperDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() collaborator!: CollaboratorRecord;
  @Prop() filterIssues!: IssuesRecord[];
  @Prop() organizationData!: OrganizationDataRecord;
  @Prop() initDate!: string;
  @Prop() endDate!: string;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
