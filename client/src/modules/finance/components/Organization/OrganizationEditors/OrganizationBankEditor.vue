<template>
  <div>
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.bankName"
      label="Name"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.bankAddress"
      label="Address"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.bankNo"
      label="No"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      type="number"
      v-model="accountingData.bankCap"
      label="Cap"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.bankPlace"
      label="Place"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.bankBIC"
      label="BIC"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.bankIBAN"
      label="IBAN"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      type="number"
      v-model="accountingData.bankValidDays"
      label="Valid days"
      dense
      autogrow
    />
    <q-card-actions align="right" class="text-primary">
      <q-btn
        unelevated
        @click="() => saveAccountingData()"
        icon="save"
        color="primary"
        align="around"
        class="btn-fixed-width btn_width"
        label="Save"
      />
    </q-card-actions>
    <Loader :loading="showLoading" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { OrganizationDataRecord } from '../../../models/models';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubGetters, githubNamespace } from '../../../store';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';

@Component({})
export default class OrganizationBankEditor extends Vue {
  @Getter(githubGetters.getOrganizationData, { namespace: githubNamespace })
  organizationData!: OrganizationDataRecord;
  @Action(githubActions.updateOrganizationData, { namespace: githubNamespace })
  updateOrganizationData!: (input: OrganizationDataRecord) => Promise<void>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  accountingData: OrganizationDataRecord;
  showLoading = false;

  constructor() {
    super();
    this.accountingData = <OrganizationDataRecord>{
      bankName: this.organizationData?.bankName,
      bankBIC: this.organizationData?.bankBIC,
      bankIBAN: this.organizationData?.bankIBAN,
      bankNo: this.organizationData?.bankNo,
      bankPlace: this.organizationData?.bankPlace,
      bankAddress: this.organizationData?.bankAddress,
      bankValidDays: this.organizationData?.bankValidDays,
      bankCap: this.organizationData?.bankCap
    };
  }

  @Watch('organizationData')
  updateValue() {
    this.accountingData.bankName = this.organizationData?.bankName;
    this.accountingData.bankBIC = this.organizationData?.bankBIC;
    this.accountingData.bankIBAN = this.organizationData?.bankIBAN;
    this.accountingData.bankNo = this.organizationData?.bankNo;
    this.accountingData.bankPlace = this.organizationData?.bankPlace;
    this.accountingData.bankAddress = this.organizationData?.bankAddress;
    this.accountingData.bankValidDays = this.organizationData?.bankValidDays;
    this.accountingData.bankCap = this.organizationData?.bankCap;
  }

  async saveAccountingData() {
    this.showLoading = true;
    await this.updateOrganizationData(this.accountingData);
    this.notify({
      message: 'Organization properties modified successfully',
      type: 'positive'
    });
    this.showLoading = false;
  }

  mounted() {
    this.updateValue();
  }
}
</script>
