<template>
  <div>
    <q-input
      square
      outlined
      class="q-ma-lg"
      type="number"
      v-model.number="accountingData.accountingInternetPrice"
      label="Internet price"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.accountingUnit"
      label="Unit of measurement"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.accountingCoin"
      label="Coin"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.accountingLabel"
      label="Label"
      dense
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
import { OrganizationDataRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubGetters, githubNamespace } from '../../../store';
import {
  componentsActionsKeys,
  componentsNamespace,
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';

@Component({})
export default class OrganizationAccountingEditor extends Vue {
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
      accountingInternetPrice: this.organizationData?.accountingInternetPrice,
      accountingUnit: this.organizationData?.accountingUnit,
      accountingCoin: this.organizationData?.accountingCoin,
      accountingLabel: this.organizationData?.accountingLabel,
    };
  }

  @Watch('organizationData')
  updateValue() {
    this.accountingData.accountingInternetPrice =
      this.organizationData?.accountingInternetPrice;
    this.accountingData.accountingUnit = this.organizationData?.accountingUnit;
    this.accountingData.accountingCoin = this.organizationData?.accountingCoin;
    this.accountingData.accountingLabel =
      this.organizationData?.accountingLabel;
  }

  async saveAccountingData() {
    this.showLoading = true;
    await this.updateOrganizationData(this.accountingData);
    this.notify({
      message: 'Accounting organization properties modified successfully',
      type: 'positive',
    });
    this.showLoading = false;
  }

  mounted() {
    this.updateValue();
  }
}
</script>
