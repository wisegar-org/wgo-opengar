<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Select collaborator"
        caption=""
        icon="people"
        :done="step > 1"
      >
        <SelectCollaboratorStep
          :value="collaboratorValue"
          @change="value => selectCollaborator(value)"
        />
      </q-step>
      <q-step
        :name="2"
        title="Collaborator info"
        caption=""
        icon="person"
        :error="
          step === 2 && (!collaboratorValue || !collaboratorValue.pay_by_hours)
        "
        :done="step > 2"
      >
        <ShowInfoCollaboratorStep :user="collaboratorValue" />
      </q-step>

      <q-step
        :name="3"
        title="Issues to Accounting"
        icon="assignment"
        :done="step > 3"
        :error="
          step === 3 && (issues.length === 0 || accountingValue.hours === 0)
        "
      >
        <ShowIssuesToAccount
          :issues="issues"
          :collaborator="collaboratorValue"
        />
      </q-step>
      <q-step
        :name="4"
        title="Accounting Data"
        icon="assignment"
        :done="step > 4"
        :error="
          step === 4 &&
            (issues.length === 0 ||
              accountingValue.hours === 0 ||
              !organizationData.accountingInternetPrice)
        "
      >
        <SetAccountingDataStep
          :accounting="accountingValue"
          :organizationData="organizationData"
        />
      </q-step>

      <q-step :name="5" title="Create accounting" icon="add_comment">
        <ShowResumeAccount
          :collaborator="collaboratorValue"
          :accounting="accountingValue"
          :countIssues="issues.length"
          :organization="organizationData"
          :total="total"
        />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="row justify-center items-center">
          <q-btn
            unelevated
            @click="nextStep"
            color="primary"
            class="col-12 col-sm-auto"
            :label="step === 5 ? 'Finish' : 'Continue'"
            :disable="!isValidContinue()"
          />
          <q-btn
            unelevated
            v-if="step > 1"
            flat
            color="primary"
            @click="previusStep"
            label="Back"
            class="col-12 col-sm-auto"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script lang="ts">
import { Action } from 'vuex-class';
import { QStepper } from 'quasar';
import {
  AddAccountParams,
  CollaboratorRecord,
  IssuesRecord,
  OrganizationDataRecord
} from '../../../models/models';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import SelectCollaboratorStep from './Steps/SelectCollaboratorStep.vue';
import ShowInfoCollaboratorStep from './Steps/ShowInfoCollaboratorStep.vue';
import ShowIssuesToAccount from './Steps/ShowIssuesToAccount.vue';
import ShowResumeAccount from './Steps/ShowResumeAccount.vue';
import SetAccountingDataStep from './Steps/SetAccountingDataStep.vue';
import { githubActions, githubNamespace } from '../../../store';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';

@Component({
  components: {
    SelectCollaboratorStep,
    ShowInfoCollaboratorStep,
    ShowIssuesToAccount,
    ShowResumeAccount,
    SetAccountingDataStep
  }
})
export default class AccountingStepper extends Vue {
  @Prop() close!: () => unknown;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() collaborator!: CollaboratorRecord;
  @Prop() filterIssues!: IssuesRecord[];
  @Prop() organizationData!: OrganizationDataRecord;
  @Prop() initDate!: string;
  @Prop() endDate!: string;
  @Action(githubActions.getIssuesByCollaborator, { namespace: githubNamespace })
  getIssues!: (user: CollaboratorRecord) => IssuesRecord[];
  @Action(githubActions.addAccounting, { namespace: githubNamespace })
  addAccount!: (params: AddAccountParams) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  step = 1;
  issues: IssuesRecord[] = this.getIssuesByFilter(this.collaborator);
  // hours = 0;
  total = 0;
  accountingValue: AddAccountParams = this.getAccountingConfig();
  collaboratorValue: CollaboratorRecord | null = this.selectCollaborator(
    this.collaborator
  );

  selectCollaborator(collaborator: CollaboratorRecord | null) {
    this.collaboratorValue = collaborator;
    if (this.collaboratorValue !== null) {
      this.issues = this.getIssuesByFilter(this.collaboratorValue);
      this.getAccountingConfig();
      this.total = this.getTotalByHours();
    } else {
      this.issues = [];
      this.accountingValue.hours = 0;
      this.total = 0;
    }
    return this.collaboratorValue;
  }

  getIssuesByFilter(collaborator: CollaboratorRecord | null) {
    if (collaborator) {
      return this.filterIssues
        ? this.filterIssues.filter(
            issue => issue.assignedToId === collaborator.id
          )
        : this.getIssues(collaborator);
    }
    return [];
  }

  async nextStep() {
    if (this.step < 5) {
      const stepper = this.$refs.stepper as QStepper;
      stepper.next();
      return;
    }

    if (this.collaboratorValue) {
      this.showLoading(true);
      if (await this.addAccount(this.getAccountingConfig())) {
        this.notify({
          message: 'Accounting created successfully ',
          type: 'positive'
        });
        if (!!this.close) {
          this.close();
        }
      }
      this.showLoading(false);
    }
  }

  getAccountingConfig() {
    const accountObj = this.accountingValue || <AddAccountParams>{};
    accountObj.hours = 0;
    accountObj.collaboratorId = 0;
    accountObj.pay_by_hours = this.collaboratorValue?.pay_by_hours || 0;
    accountObj.pay_to_internet = 1;
    accountObj.issuesId = [];
    accountObj.reposId = [];
    accountObj.projectsId = [];
    accountObj.internet_cost =
      this.organizationData?.accountingInternetPrice || 0;
    accountObj.initDate = this.initDate;
    accountObj.endDate = this.endDate;

    if (this.collaboratorValue) {
      accountObj.collaboratorId = this.collaboratorValue.id;
    }

    (this.issues || []).forEach(issue => {
      accountObj.hours += issue.hours ? issue.hours : 0;
      issue.id ? accountObj.issuesId.push(issue.id) : null;
      issue.repository && accountObj.reposId.indexOf(issue.repository.id) === -1
        ? accountObj.reposId.push(issue.repository.id)
        : null;
      issue.project && accountObj.projectsId.indexOf(issue.project.id) === -1
        ? accountObj.projectsId.push(issue.project.id)
        : null;
    });
    this.accountingValue = accountObj;
    return accountObj;
  }

  previusStep() {
    if (this.step > 1) {
      const stepper = this.$refs.stepper as QStepper;
      stepper.previous();
    }
  }

  isValidContinue() {
    switch (this.step) {
      case 1:
        return !!this.collaboratorValue;
        break;
      case 2:
        return this.collaboratorValue && this.collaboratorValue.pay_by_hours;
        break;
      case 3:
        return this.issues.length !== 0 && this.accountingValue.hours > 0;
        break;
      default:
        return true;
        break;
    }
  }

  getHourIssues() {
    return this.issues
      .map(issues => (issues.hours ? issues.hours : 0))
      .reduce((a, b) => a + b, 0);
  }

  getTotalByHours() {
    let taxes = this.accountingValue.taxes || 0;
    const hours = this.accountingValue.hours;
    const total =
      this.collaboratorValue && this.organizationData.accountingInternetPrice
        ? hours * this.collaboratorValue.pay_by_hours * 1000 +
          hours * this.organizationData.accountingInternetPrice * 1000
        : 0;
    return (total - taxes * 1000) / 1000;
  }

  @Watch('accountingValue.taxes')
  updateTotalToPay() {
    this.total = this.getTotalByHours();
  }
}
</script>
