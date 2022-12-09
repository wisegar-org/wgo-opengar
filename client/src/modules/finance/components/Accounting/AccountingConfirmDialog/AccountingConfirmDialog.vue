<template>
  <wgo-dialog :options="options">
    <q-card-section class="q-ma-none q-pa-none">
      <AccountingDetails :accounting="accounting" />
    </q-card-section>
    <template slot="buttons">
      <q-btn
        unelevated
        @click="() => onClose()"
        color="primary"
        align="center"
        class="col-12 col-sm-auto q-mt-sm q-mx-sm"
        :label="translationContent.WGO_CLOSE_BTN"
      />
      <q-btn
        unelevated
        @click="() => confirmAccounting()"
        color="primary"
        align="center"
        class="col-12 col-sm-auto q-mt-sm q-mx-sm"
        :label="translationContent.WGO_CONFIRM_BTN"
      />
    </template>
  </wgo-dialog>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { AccountRecord } from '@wisegar-org/wgo-base-models/build/models';
import { githubActions, githubNamespace } from '../../../store';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AccountingDetails from '../AccountingDetailsDialog/AccountingDetails.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import {
  componentsActionsKeys,
  componentsNamespace,
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';
import { IWGODialogOptions } from '@wisegar-org/quasar-app-extension-wgo-vue-components/src/lib';
import {
  languageActions,
  languageGetters,
  languageNamespace,
} from '../../../../wgo/store/Language';
import {
  ITranslationFinanceAccountingKeys,
  TranslationsKeys,
} from '../TranslationsKeys';

@Component({
  components: {
    AccountingDetails,
    Dialog,
  },
})
export default class AccountingConfirmDialog extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace,
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() accounting!: AccountRecord;
  @Action(githubActions.confirmAccounting, { namespace: githubNamespace })
  confirmAccountingAction!: (id: number) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  showLoading = false;

  options: IWGODialogOptions = {
    open: this.showModal,
    onClose: () => this.onClose(),
    hideButtons: true,
    fullHeight: true,
    fullWidth: true,
  };

  async confirmAccounting() {
    this.showLoading = true;
    if (await this.confirmAccountingAction(this.accounting.id)) {
      this.notify({
        message: this.translationContent.WGO_FINANCE_ACCOUNTING_CONFIRM_SUCCESS,
        type: 'positive',
      });
      this.close();
    } else {
      this.notify({
        message: this.translationContent.WGO_FINANCE_ACCOUNTING_CONFIRM_FAIL,
        type: 'negative',
      });
    }
    this.showLoading = false;
  }

  onClose() {
    if (this.close) {
      this.close();
    }
  }

  @Watch('showModal')
  showModalChange() {
    this.options.open = this.showModal;
  }

  @Watch('translationContent')
  translationsChange() {
    this.options.title =
      this.translationContent.WGO_FINANCE_ACCOUNTING_CONFIRM_TITLE;
  }

  async mounted() {
    await this.registerTranslations(TranslationsKeys);
    this.options.title =
      this.translationContent.WGO_FINANCE_ACCOUNTING_CONFIRM_TITLE;
  }
}
</script>
