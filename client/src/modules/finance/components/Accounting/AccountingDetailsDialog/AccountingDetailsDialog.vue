<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="translationContent.WGO_FINANCE_ACCOUNTING_DETAILS_TITLE"
    :close="() => onClose()"
    styleDialog="width: 700px; max-width: 80vw"
  >
    <template slot="content">
      <AccountingDetails :accounting="accounting" />
    </template>
    <template slot="buttons">
      <q-btn
        unelevated
        @click="() => onClose()"
        color="primary"
        align="around"
        class="col-12 col-sm-auto"
        :label="translationContent.WGO_CLOSE_BTN"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { AccountRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AccountingDetails from './AccountingDetails.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import { Getter } from 'vuex-class';
import {
  languageGetters,
  languageNamespace
} from '../../../../wgo/store/Language';
import { ITranslationFinanceAccountingKeys } from '../TranslationsKeys';

@Component({
  components: {
    AccountingDetails,
    Dialog
  }
})
export default class AccountingDetailsDialog extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
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
