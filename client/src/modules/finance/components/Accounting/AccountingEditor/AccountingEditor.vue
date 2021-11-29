<template>
  <div class="row q-col-gutter-none justify-end" style="width: 100%">
    <div class="col-12 q-pa-sm">
      <q-input
        v-model="accountingEdit.taxes"
        outlined
        label="Taxes"
        type="number"
        dense
        stacked-label
        :disable="accounting.status !== 1"
      />
    </div>
    <div class="col-12 q-pa-sm">
      <Editor
        :toEdit="accountingEdit"
        propToEdir="details"
        label="Observations"
      />
    </div>
    <div class="col-12 q-pa-sm">
      <Editor
        :toEdit="accountingEdit"
        propToEdir="payment_comment"
        label="Payment comment"
      />
    </div>
    <q-card-section
      class="col-12 row justify-center text-primary q-px-sm q-pt-md"
    >
      <q-btn
        unelevated
        @click="() => saveAccounting()"
        color="primary"
        align="center"
        class="col-12 col-sm-auto"
        label="Save"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { AccountRecord } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { githubActions, githubNamespace } from '../../../store';
import Editor from '../../Editor.vue';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';

@Component({
  components: {
    Editor
  }
})
export default class AccountingEditor extends Vue {
  @Prop() accounting!: AccountRecord;
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Action(githubActions.updateAccountingData, { namespace: githubNamespace })
  updateAccounting!: (record: AccountRecord) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  accountingEdit: AccountRecord;

  constructor() {
    super();
    this.accountingEdit = <AccountRecord>{ ...this.accounting };
  }

  async saveAccounting() {
    this.showLoading(true);
    if (await this.updateAccounting(this.accountingEdit)) {
      this.notify({
        message: 'Accounting modified successfully ',
        type: 'positive'
      });
      this.close();
    }
    this.showLoading(false);
  }
}
</script>
