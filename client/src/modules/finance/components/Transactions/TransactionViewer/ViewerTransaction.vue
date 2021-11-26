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
      v-model="transaction.status"
      label="Description"
      readonly
      autogrow
      dense
    />

    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="transaction.cost"
      type="number"
      label="Cost"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="transaction.idTransaction"
      label="Id transaction"
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
    <q-card-section class="row items-center justify-center text-primary">
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
import { TransactionRecord } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component({})
export default class Viewertransaction extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop({ required: true }) transaction!: TransactionRecord;

  initDate: string;
  nameColl: string;

  constructor() {
    super();
    this.initDate = moment(this.transaction.date.toString()).format(
      'DD/MM/YYYY'
    );
    this.nameColl = this.transaction.collaborator
      ? this.transaction.collaborator.name
      : '';
  }
}
</script>
