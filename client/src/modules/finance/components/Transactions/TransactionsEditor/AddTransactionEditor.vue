<template>
  <div>
    <div class="q-mx-md q-mb-lg q-mt-md">
      <FilterSelect
        label="Collaborator"
        :options="getValidCollaborators()"
        filterProp="login"
        @onChange="value => setCollaborator(value)"
      />
    </div>
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="card_number"
      label="Card number"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="transaction.status"
      label="Status"
      dense
    />

    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="transaction.cost"
      type="number"
      :autofocus="true"
      label="Cost"
      dense
    />
    <q-input
      dense
      outlined
      v-model="initDate"
      mask="date"
      class="q-mx-md q-my-lg"
      label="Date"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="initDate">
              <div class="row items-center justify-end">
                <q-btn
                  unelevated
                  v-close-popup
                  label="Close"
                  color="primary"
                  flat
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="(card_balance * 1000 + (transaction.cost || 0) * 1000) / 1000"
      type="number"
      readonly
      label="Card balance"
      dense
    />
    <q-card-section class="row items-center justify-center text-primary">
      <q-btn
        unelevated
        color="primary"
        align="center"
        :disable="!isValid()"
        class="col-12 col-sm-auto"
        @click="() => addTransactionClick()"
        label="Create"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { Dictionary, TransactionRecord } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../../store';
import FilterSelect from '../../FilterSelect.vue';
import moment from 'moment';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';

@Component({
  components: { FilterSelect }
})
export default class AddTransactionEditor extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;

  @Getter(githubGetters.getTransactions, { namespace: githubNamespace })
  transactions!: TransactionRecord[];
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  collaborators!: Dictionary[];

  @Action(githubActions.addTransaction, { namespace: githubNamespace })
  addTransaction!: (record: TransactionRecord) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  transaction: TransactionRecord;
  card_balance = 0;
  card_number = '';
  initDate = '';

  constructor() {
    super();
    this.transaction = <TransactionRecord>{
      status: '',
      card_balance: 0,
      cost: 0,
      date: new Date()
    };
    this.initDate = moment(this.transaction.date.toString()).format(
      'YYYY/MM/DD'
    );
  }

  setCollaborator(collaborator: Dictionary) {
    if (collaborator !== null) {
      this.transaction.collaborator = collaborator;
      this.card_number = collaborator.card_number;
      this.transaction.collaboratorId = parseInt(collaborator.id);
      this.setCardBalance();
    } else {
      this.transaction.collaboratorId = 0;
      this.card_number = '';
      this.card_balance = 0;
    }
  }

  getValidCollaborators() {
    return this.collaborators.filter(
      collaborator => !!collaborator.card_number
    );
  }

  setCardBalance() {
    const userTransactions = this.transactions.filter(
      transaction =>
        transaction.collaborator.login === this.transaction.collaborator.login
    );
    const countTransactions = userTransactions.length;
    this.card_balance =
      countTransactions > 0 ? userTransactions[0].card_balance : 0;
  }

  isValid() {
    return (
      !!this.transaction.collaboratorId &&
      !!this.transaction.status &&
      !!this.transaction.date
    );
  }

  async addTransactionClick() {
    this.showLoading(true);
    const result = await this.addTransaction(<TransactionRecord>{
      collaboratorId: this.transaction.collaboratorId,
      status: this.transaction.status,
      cost: this.transaction.cost,
      date: moment(this.initDate).toDate(),
      card_balance:
        (this.card_balance * 1000 + this.transaction.cost * 1000) / 1000
    });
    this.showLoading(false);
    if (result) {
      this.notify({
        message: 'Transaction created successfully ',
        type: 'positive'
      });
      if (!!this.close) {
        this.close();
      }
    }
  }
}
</script>
