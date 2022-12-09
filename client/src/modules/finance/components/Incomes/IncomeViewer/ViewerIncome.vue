<template>
  <div>
    <q-input
      square
      outlined
      class="q-mx-md q-mb-lg q-mt-md"
      v-model="nameColl"
      label="Client"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="income.name"
      label="Name"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="income.description"
      label="Description"
      readonly
      autogrow
      dense
    />

    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="income.amount"
      type="number"
      label="Amount"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="initDate"
      label="Date"
      readonly
      stack-label
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="status"
      label="Status"
      readonly
      stack-label
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="repeat"
      label="Repeat"
      readonly
      stack-label
      dense
    />
    <MediaListViewer
      v-if="!!income.invoiceDocs && income.invoiceDocs.length > 0"
      title="Invoice documents"
      :items="income.invoiceDocs"
      :showLoading="showLoading"
    />

    <q-card-section
      class="row items-center justify-center text-primary q-mt-md"
    >
      <q-btn
        unelevated
        color="primary"
        align="center"
        class="col-12 col-sm-auto"
        @click="() => close()"
        label="Close"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { IncomeRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import MediaListViewer from '../../../../wgo/components/MediaList/MediaListViewer.vue';
import moment from 'moment';
import {
  getFrequencyString,
  getStatusPayedString,
} from '@wisegar-org/wgo-base-models/build/parsers';

@Component({
  components: {
    MediaListViewer,
  },
})
export default class ViewerIncome extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop({ required: true }) income!: IncomeRecord;

  initDate: string;
  repeat: string;
  status: string;
  nameColl: string;

  constructor() {
    super();
    this.initDate = moment(this.income.date.toString()).format('DD/MM/YYYY');
    this.repeat = getFrequencyString(this.income.repeat);
    this.status = getStatusPayedString(this.income.status);
    this.nameColl = this.income.collaborator
      ? this.income.collaborator.name
      : '';
  }
}
</script>
