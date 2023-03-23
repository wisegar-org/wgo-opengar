<template>
  <div class="row q-col-gutter-none justify-end q-pa-sm" style="width: 100%">
    <div class="col-12 q-pa-sm">
      <q-input
        v-model="accountingEdit.taxes"
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_TAXES"
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
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_OBSERVATIONS"
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
    <q-card-section
      class="col-12 row justify-center text-primary q-px-sm q-pt-md"
    >
      <q-btn
        unelevated
        @click="() => saveAccounting()"
        color="primary"
        align="center"
        class="col-12 col-sm-auto"
        :label="translationContent.WGO_SAVE_BTN"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { AccountRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubNamespace } from '../../../store';
import {
  componentsActionsKeys,
  componentsNamespace,
} from '../../../../wgo/store/ComponentsState';
import Editor from '../../Editor.vue';
import { INotify } from '../../../../wgo/models';
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
    Editor,
  },
})
export default class AccountingEditor extends Vue {
  @Prop() accounting!: AccountRecord;
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Action(githubActions.updateAccountingData, { namespace: githubNamespace })
  updateAccounting!: (record: AccountRecord) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace,
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;

  accountingEdit: AccountRecord;

  constructor() {
    super();
    this.accountingEdit = <AccountRecord>{ ...this.accounting };
  }

  async saveAccounting() {
    this.showLoading(true);
    if (await this.updateAccounting(this.accountingEdit)) {
      this.notify({
        message: this.translationContent.WGO_FINANCE_ACCOUNTING_EDIT_SUCCESS,
        type: 'positive',
      });
      this.close();
    } else {
      this.notify({
        message: this.translationContent.WGO_FINANCE_ACCOUNTING_EDIT_FAIL,
        type: 'negative',
      });
    }
    this.showLoading(false);
  }

  async mounted() {
    await this.registerTranslations(TranslationsKeys);
  }
}
</script>
