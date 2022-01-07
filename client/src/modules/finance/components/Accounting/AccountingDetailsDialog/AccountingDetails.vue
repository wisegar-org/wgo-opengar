<template>
  <div v-if="!!accounting" class="row col-12 q-pa-sm" style="width: 100%">
    <div v-if="!!contributor" class="col-12 col-md-4">
      <q-input
        :value="contributor ? contributor.login : '-'"
        outlined
        readonly
        class="q-ma-sm"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_ACCOUNTED_TO"
        dense
        autogrow
        stacked-label
      >
        <template v-slot:prepend>
          <q-avatar>
            <img :src="contributor.avatar_url" />
          </q-avatar>
        </template>
      </q-input>
    </div>
    <div v-if="!!contributor" class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="contributor.name"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_NAME"
        autogrow
        readonly
      />
    </div>
    <div v-if="!!contributor" class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="contributor.address"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_ADDRESS"
        autogrow
        readonly
      />
    </div>
    <div v-if="!!contributor" class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="contributor.card_number"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_CARD_NUMBER"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="accounting.pay_by_hours || 0"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_PAY_BY_HOURS"
        autogrow
        readonly
      />
    </div>
    <!-- <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="accounting.pay_to_internet"
        label="Pay to internet"
        autogrow
        readonly
      />
    </div> -->
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="`${accounting.value} (${accounting.value + accounting.taxes})`"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_TOTAL_TO_PAY"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="getFormatDate(accounting.date.toString())"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_DATE"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="getReposAccounting()"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_REPOSITORY"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-sm"
        :value="accounting.taxes"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_TAXES"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        :value="accounting.initDate"
        readonly
        outlined
        class="q-ma-sm"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_START_DATE"
        mask="date"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        :value="accounting.endDate"
        readonly
        outlined
        class="q-ma-sm"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_END_DATE"
        mask="date"
        dense
        stacked-label
      />
    </div>

    <SimpleViewIssues
      class="q-pa-sm"
      :issues="issues"
      :title="translationContent.WGO_FINANCE_ACCOUNTING_ACCOUNTED_ISSUES_TITLE"
    />
    <div v-if="accounting.details" class="col-12 q-pa-md">
      <VisorEditor
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_END_DATE"
        :text="accounting.details"
      />
    </div>
    <div v-if="accounting.payment_comment" class="col-12 q-pa-md">
      <VisorEditor
        :label="
          translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_PAYMENT_COMMENT
        "
        :text="accounting.payment_comment || ''"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  AccountRecord,
  IssuesRecord,
  OptionFilter
} from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubNamespace } from '../../../store';
import SimpleViewIssues from '../../Issues/SimpleViewIssues/SimpleViewIssues.vue';
import VisorEditor from '../../VisorEditor.vue';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../../../wgo/store/Language';
import { ITranslationFinanceAccountingKeys } from '../TranslationsKeys';
import { TranslationsKeys } from '../TranslationsKeys';

@Component({
  components: {
    SimpleViewIssues,
    VisorEditor
  }
})
export default class AccountingDetails extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Prop() accounting!: AccountRecord;
  @Action(githubActions.getIssuessByAccount, { namespace: githubNamespace })
  loadIssues!: (id: number) => Promise<IssuesRecord[]>;
  issues: IssuesRecord[] = [];
  contributor = this.accounting?.contributor || null;

  getReposAccounting() {
    return this.accounting.repos
      ? this.accounting.repos
          .map((record: OptionFilter) => record.title)
          .join(', ')
      : '';
  }

  getFormatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  async mounted() {
    await this.registerTranslations(TranslationsKeys);
    this.issues = this.accounting?.id
      ? await this.loadIssues(this.accounting.id)
      : [];
  }
}
</script>
