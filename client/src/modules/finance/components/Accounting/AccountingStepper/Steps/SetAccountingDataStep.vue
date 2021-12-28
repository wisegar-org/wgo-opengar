<template>
  <div class="row">
    <div class="col-12 q-pa-sm">
      <q-input
        v-model="accounting.taxes"
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_TAXES"
        type="number"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 q-pa-sm">
      <Editor
        :toEdit="accounting"
        propToEdir="details"
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_OBSERVATIONS"
      />
    </div>
    <div class="col-12 q-pa-sm">
      <Editor
        :toEdit="accounting"
        propToEdir="payment_comment"
        :label="
          translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_PAYMENT_COMMENT
        "
      />
    </div>
    <div class="col-12 q-pa-sm">
      <q-input
        v-model="organizationData.accountingInternetPrice"
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_INTERNET_PRICE"
        dense
        stacked-label
        autogrow
        :error="!organizationData.accountingInternetPrice"
        readonly
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import {
  languageGetters,
  languageNamespace
} from '../../../../../wgo/store/Language';
import {
  AddAccountParams,
  OrganizationDataRecord
} from '../../../../models/models';
import Editor from '../../../Editor.vue';
import { ITranslationFinanceAccountingKeys } from '../../TranslationsKeys';

@Component({
  components: {
    Editor
  }
})
export default class SetAccountingDataStep extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Prop({ required: true }) accounting!: AddAccountParams;
  @Prop({ required: true }) organizationData!: OrganizationDataRecord;
}
</script>
