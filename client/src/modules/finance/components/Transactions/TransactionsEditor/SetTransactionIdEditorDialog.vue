<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Set Transaction Id"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <q-input
        square
        outlined
        class="q-mx-md q-my-lg"
        v-model="idTransaction"
        :autofocus="true"
        label="Transaction Id"
        dense
      />
      <q-card-section class="row items-center justify-center text-primary">
        <q-btn
          unelevated
          color="primary"
          align="center"
          :disable="!idTransaction"
          class="col-12 col-sm-auto"
          @click="() => handleSetTransactionId()"
          label="Update"
        />
      </q-card-section>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { INotify } from 'src/modules/wgo/models';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { TransactionRecord } from '../../../models/models';
import { githubActions, githubNamespace } from '../../../store';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    Dialog
  }
})
export default class SetTransactionIdEditorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() transaction!: TransactionRecord;

  @Action(githubActions.setTransactionId, { namespace: githubNamespace })
  setTransactionId!: (record: TransactionRecord) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  showLoading = false;
  idTransaction = '';

  @Watch('showModal')
  setIdTransaction() {
    this.idTransaction =
      this.showModal && this.transaction && this.transaction.idTransaction
        ? this.transaction.idTransaction
        : '';
  }

  async handleSetTransactionId() {
    this.showLoading = true;
    const result = await this.setTransactionId({
      ...this.transaction,
      idTransaction: this.idTransaction
    });
    this.showLoading = false;
    if (result) {
      this.notify({
        message: 'Transaction id updated successfully ',
        type: 'positive'
      });
      if (!!this.close) {
        this.close();
      }
    }
  }

  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
