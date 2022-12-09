<template>
  <div>
    <q-input
      square
      outlined
      class="q-mx-md q-mb-lg q-mt-md"
      v-model="nameColl"
      label="Provider"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="expense.name"
      label="Name"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="expense.description"
      label="Description"
      readonly
      autogrow
      dense
    />

    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="expense.cost"
      type="number"
      label="Cost"
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
      v-if="!!expense.bildDocs && expense.bildDocs.length > 0"
      title="Bild documents"
      :items="expense.bildDocs"
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
import { ExpenseRecord } from '@wisegar-org/wgo-base-models/build/models';
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
export default class ViewerExpense extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop({ required: true }) expense!: ExpenseRecord;

  initDate: string;
  repeat: string;
  status: string;
  nameColl: string;

  constructor() {
    super();
    this.initDate = moment(this.expense.date.toString()).format('DD/MM/YYYY');
    this.repeat = getFrequencyString(this.expense.repeat);
    this.status = getStatusPayedString(this.expense.status);
    this.nameColl = this.expense.collaborator
      ? this.expense.collaborator.name
      : '';
  }
}
</script>
