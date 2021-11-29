<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Confirm accounting"
    :close="() => onClose()"
    styleDialog="width: 500px; max-width: 80vw"
  >
    <template slot="content">
      <q-card-section class="q-ma-none q-pa-none">
        <AccountingDetails :accounting="accounting" />
      </q-card-section>
      <q-card-section
        class="row q-ma-none items-center justify-center q-pa-none"
      >
        <q-btn
          unelevated
          @click="() => onClose()"
          color="primary"
          align="center"
          class="col-12 col-sm-auto q-mt-sm q-mx-sm"
          label="Close"
        />
        <q-btn
          unelevated
          @click="() => confirmAccounting()"
          color="primary"
          align="center"
          class="col-12 col-sm-auto q-mt-sm q-mx-sm"
          label="Confirm"
        />
      </q-card-section>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Action } from 'vuex-class';
import { AccountRecord } from '../../../models/models';
import { githubActions, githubNamespace } from '../../../store';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AccountingDetails from '../AccountingDetailsDialog/AccountingDetails.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';

@Component({
  components: {
    AccountingDetails,
    Dialog
  }
})
export default class AccountingConfirmDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() accounting!: AccountRecord;
  @Action(githubActions.confirmAccounting, { namespace: githubNamespace })
  confirmAccountingAction!: (id: number) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  showLoading = false;

  async confirmAccounting() {
    this.showLoading = true;
    if (await this.confirmAccountingAction(this.accounting.id)) {
      this.notify({
        message: 'Accounting confirmed successfully ',
        type: 'positive'
      });
      this.close();
    }
    this.showLoading = false;
  }

  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
