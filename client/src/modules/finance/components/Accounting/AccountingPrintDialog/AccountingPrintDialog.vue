<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="title"
    :close="() => onClose()"
    :fullWidth="true"
  >
    <template slot="content">
      <q-card-section class="q-pa-none">
        <AccountingPrint :accounting="accounting" />
      </q-card-section>

      <q-card-section class="col-12 row justify-center text-primary">
        <q-btn
          unelevated
          @click="() => onClose()"
          color="primary"
          align="center"
          class="col-12 col-sm-auto"
          label="Close"
        />
        <q-btn
          unelevated
          @click="() => print()"
          color="primary"
          align="center"
          class="col-12 col-sm-auto"
          label="Print"
        />
      </q-card-section>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { AccountRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AccountingPrint from './AccountingPrint.vue';
import printJS from 'print-js';

@Component({
  components: {
    AccountingPrint
  }
})
export default class AccountingPrintDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() accounting!: AccountRecord;
  @Prop({ default: 'Print Accounting' }) title!: string;
  showLoading = false;

  print() {
    printJS({
      printable: 'print-pdf-accounting',
      type: 'html',
      style: '@page { justify-content: center, max-width: 100vw }',
      honorColor: true,
      targetStyles: ['*'],
      documentTitle: this.accounting.payment_code,
      showModal: true
    });
  }

  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
