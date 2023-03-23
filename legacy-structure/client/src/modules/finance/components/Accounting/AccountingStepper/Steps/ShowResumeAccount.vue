<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-4 q-pa-sm">
      <q-input
        :value="getCollaboratorInfo()"
        outlined
        readonly
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_ACCOUNTED_TO"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="countIssues"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_ISSUES_TOTAL"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.hours"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_HOURS_TOTAL"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.pay_by_hours"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_PAY_BY_HOURS"
        dense
        stacked-label
      />
    </div>
    <!-- <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.pay_to_internet"
        readonly
        outlined
        label="Pay to Internet"
        dense
        stacked-label
      />
    </div> -->
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="total"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_TOTAL_TO_PAY"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="organization.accountingInternetPrice"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_INTERNET_PRICE"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.taxes"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_TAXES"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.initDate"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_START_DATE"
        mask="date"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.endDate"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_END_DATE"
        mask="date"
        dense
        stacked-label
      />
    </div>
    <div v-if="accounting.details" class="col-12 q-pa-sm">
      <VisorEditor
        :text="accounting.details"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_OBSERVATIONS"
      />
    </div>
    <div v-if="accounting.payment_comment" class="col-12 q-pa-sm">
      <VisorEditor
        :text="accounting.payment_comment"
        :label="
          translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_PAYMENT_COMMENT
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  AddAccountParams,
  CollaboratorRecord,
  OrganizationDataRecord,
} from '@wisegar-org/wgo-base-models/build/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VisorEditor from '../../../VisorEditor.vue';
import { Getter } from 'vuex-class';
import {
  languageGetters,
  languageNamespace,
} from '../../../../../wgo/store/Language';
import { ITranslationFinanceAccountingKeys } from '../../TranslationsKeys';

@Component({
  components: {
    VisorEditor,
  },
})
export default class ShowResumeAccount extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Prop({ default: 0 }) hours!: number;
  @Prop() collaborator!: CollaboratorRecord;
  @Prop() accounting!: AddAccountParams;
  @Prop() organization!: OrganizationDataRecord;
  @Prop({ default: 0 }) countIssues!: number;
  @Prop({ default: 0 }) total!: number;

  pay_by_hours = this.collaborator?.pay_by_hours;
  // pay_to_internet = this.collaborator?.pay_to_internet;

  getCollaboratorInfo() {
    return this.collaborator ? this.collaborator.login : '';
  }
}
</script>
