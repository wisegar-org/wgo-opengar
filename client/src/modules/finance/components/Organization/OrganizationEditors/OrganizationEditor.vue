<template>
  <div>
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.name"
      label="Name"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.description"
      label="Description"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.address"
      label="Address"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.no"
      label="No"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      type="number"
      v-model="accountingData.cap"
      label="CAP"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.place"
      label="Place"
      dense
      autogrow
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      type="number"
      v-model="accountingData.phone"
      label="Phone"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      type="email"
      v-model="accountingData.email"
      label="Email"
      dense
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      v-model="accountingData.web"
      label="Web page"
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
export default class OrganizationEditor extends Vue {
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
      name: this.organizationData?.name,
      description: this.organizationData?.description,
      phone: this.organizationData?.phone,
      cap: this.organizationData?.cap,
      email: this.organizationData?.email,
      address: this.organizationData?.address,
      place: this.organizationData?.place,
      web: this.organizationData?.web,
      no: this.organizationData?.no,
    };
  }

  @Watch('organizationData')
  updateValue() {
    this.accountingData.name = this.organizationData?.name;
    this.accountingData.description = this.organizationData?.description;
    this.accountingData.address = this.organizationData?.address;
    this.accountingData.place = this.organizationData?.place;
    this.accountingData.phone = this.organizationData?.phone;
    this.accountingData.email = this.organizationData?.email;
    this.accountingData.cap = this.organizationData?.cap;
    this.accountingData.web = this.organizationData?.web;
    this.accountingData.no = this.organizationData?.no;
  }

  async saveAccountingData() {
    this.showLoading = true;
    await this.updateOrganizationData(this.accountingData);
    this.notify({
      message: 'Organization properties modified successfully',
      type: 'positive',
    });
    this.showLoading = false;
  }

  mounted() {
    this.updateValue();
  }
}
</script>
