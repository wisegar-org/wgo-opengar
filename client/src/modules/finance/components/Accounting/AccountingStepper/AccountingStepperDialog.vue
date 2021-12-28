<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="translationContent.WGO_FINANCE_ACCOUNTING_CREATE_TITLE"
    :close="() => onClose()"
    :fullWidth="true"
  >
    <template slot="content">
      <AccountingStepper
        :close="close"
        :showLoading="value => (showLoading = value)"
        :collaborator="collaborator"
        :filterIssues="filterIssues"
        :organizationData="organizationData"
        :initDate="initDate"
        :endDate="endDate"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  CollaboratorRecord,
  IssuesRecord,
  OrganizationDataRecord
} from '../../../models/models';
import AccountingStepper from './AccountingStepper.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import { Action, Getter } from 'vuex-class';
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
    AccountingStepper,
    Dialog
  }
})
export default class AccountingStepperDialog extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() collaborator!: CollaboratorRecord;
  @Prop() filterIssues!: IssuesRecord[];
  @Prop() organizationData!: OrganizationDataRecord;
  @Prop() initDate!: string;
  @Prop() endDate!: string;

  showLoading = false;
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
