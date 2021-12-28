<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="translationContent.WGO_FINANCE_ACCOUNTING_EDIT_TITLE"
    :close="() => onClose()"
    icon="edit"
    styleDialog="width: 500px; max-width: 80vw"
  >
    <template slot="content">
      <div class="row q-pa-sm">
        <div class="col-12 q-pa-sm">
          <q-input
            v-model="accountingEdit.taxes"
            outlined
            :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_TAXES"
            type="number"
            dense
            stacked-label
            :disable="accountingEdit.status !== 1"
          />
        </div>
        <div class="col-12 q-pa-sm">
          <Editor
            :toEdit="accountingEdit"
            propToEdir="details"
            :label="
              translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_OBSERVATIONS
            "
          />
        </div>
        <div class="col-12 q-pa-sm">
          <Editor
            :toEdit="accountingEdit"
            propToEdir="payment_comment"
            :label="
              translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_PAYMENT_COMMENT
            "
          />
        </div>
      </div>
    </template>
    <template slot="buttons">
      <q-btn
        unelevated
        @click="() => saveAccounting()"
        color="primary"
        align="center"
        class="col-12 col-sm-auto"
        :label="translationContent.WGO_SAVE_BTN"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { AccountRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AccountingEditor from './AccountingEditor.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubNamespace } from '../../../store';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';

import Editor from '../../Editor.vue';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../../../wgo/store/Language';
import {
  ITranslationFinanceAccountingKeys,
  TranslationsKeys
} from '../TranslationsKeys';

@Component({
  components: {
    AccountingEditor,
    Dialog,
    Editor
  }
})
export default class AccountingEditorDialog extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() accounting!: AccountRecord;
  @Action(githubActions.updateAccountingData, { namespace: githubNamespace })
  updateAccounting!: (record: AccountRecord) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  showLoading = false;
  accountingEdit: AccountRecord;

  constructor() {
    super();
    this.accountingEdit = <AccountRecord>{ ...this.accounting };
  }

  async saveAccounting() {
    this.showLoading = true;
    if (await this.updateAccounting(this.accountingEdit)) {
      this.notify({
        message: this.translationContent.WGO_FINANCE_ACCOUNTING_EDIT_SUCCESS,
        type: 'positive'
      });
      this.close();
    } else {
      this.notify({
        message: this.translationContent.WGO_FINANCE_ACCOUNTING_EDIT_FAIL,
        type: 'negative'
      });
    }
    this.showLoading = false;
  }

  onClose() {
    if (this.close) {
      this.close();
    }
  }

  async mounted() {
    await this.registerTranslations(TranslationsKeys);
  }
}
</script>
