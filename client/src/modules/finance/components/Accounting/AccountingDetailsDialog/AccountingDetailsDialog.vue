<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Accounting Details"
    :close="() => onClose()"
    styleDialog="width: 500px; max-width: 80vw"
  >
    <template slot="content">
      <q-card-section class="q-pa-none">
        <AccountingDetails :accounting="accounting" />
      </q-card-section>

      <q-card-section class="col-12 row justify-center text-primary">
        <q-btn
          unelevated
          @click="() => onClose()"
          color="primary"
          align="around"
          class="col-12 col-sm-auto"
          label="Close"
        />
      </q-card-section>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { AccountRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AccountingDetails from './AccountingDetails.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    AccountingDetails,
    Dialog
  }
})
export default class AccountingDetailsDialog extends Vue {
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
