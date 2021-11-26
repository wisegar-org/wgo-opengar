<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-4 q-pa-sm">
      <q-input
        :value="getCollaboratorInfo()"
        outlined
        readonly
        label="Collaborator"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="countIssues"
        readonly
        outlined
        label="Number of Issues"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.hours"
        readonly
        outlined
        label="Hours"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.pay_by_hours"
        readonly
        outlined
        label="Pay by Hours"
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
        label="Total to pay"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="organization.accountingInternetPrice"
        readonly
        outlined
        label="Internet price"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.taxes"
        readonly
        outlined
        label="Taxes"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-4 q-pl-sm q-pa-sm">
      <q-input
        :value="accounting.initDate"
        readonly
        outlined
        label="Init date"
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
        label="End date"
        mask="date"
        dense
        stacked-label
      />
    </div>
    <div v-if="accounting.details" class="col-12 q-pa-sm">
      <VisorEditor :text="accounting.details" label="Observations" />
    </div>
    <div v-if="accounting.payment_comment" class="col-12 q-pa-sm">
      <VisorEditor :text="accounting.payment_comment" label="Payment comment" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  AddAccountParams,
  CollaboratorRecord,
  OrganizationDataRecord
} from '../../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VisorEditor from '../../../VisorEditor.vue';

@Component({
  components: {
    VisorEditor
  }
})
export default class ShowResumeAccount extends Vue {
  @Prop({ default: 0 }) hours!: number;
  @Prop() collaborator!: CollaboratorRecord;
  @Prop() accounting!: AddAccountParams;
  @Prop() organization!: OrganizationDataRecord;
  @Prop({ default: 0 }) countIssues!: number;
  @Prop({ default: 0 }) total!: number;

  pay_by_hours = this.collaborator?.pay_by_hours;
  // pay_to_internet = this.collaborator?.pay_to_internet;

  getCollaboratorInfo() {
    return this.collaborator ? this.collaborator.login : 'Collaborator';
  }
}
</script>
