<template>
  <div class="row">
    <div class="col-12 q-pa-sm">
      <q-input
        v-model="accounting.taxes"
        outlined
        label="Taxes"
        type="number"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 q-pa-sm">
      <Editor :toEdit="accounting" propToEdir="details" label="Observation"/>
    </div>
    <div class="col-12 q-pa-sm">
      <Editor :toEdit="accounting" propToEdir="payment_comment" label="Payment comment"/>
    </div>
    <div class="col-12 q-pa-sm">
      <q-input
        v-model="organizationData.accountingInternetPrice"
        outlined
        label="Internet price"
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
import { AddAccountParams, OrganizationDataRecord } from '../../../../models/models';
import Editor from '../../../Editor.vue'

@Component({
  components: {
    Editor
  }
})
export default class SetAccountingDataStep extends Vue {
  @Prop({ required: true }) accounting!: AddAccountParams;
  @Prop({ required: true }) organizationData!: OrganizationDataRecord;
}
</script>
