<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      bordered
      flat
      title=""
      :data="transactionFilterRecord"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              Transactions
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              v-if="userLogged && userLogged.isSuperAdmin"
              color="primary"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
              icon="add"
              label="Create Transaction"
              @click="() => (showAddTransalationDialog = true)"
            />
          </div>
        </div>
        <div class="row q-col-gutter-none justify-end" style="width: 100%">
          <div class="col-12 col-md-4">
            <FilterSelect
              label="Type"
              :options="transactionTypeOptions"
              :value="filter.type"
              filterProp="label"
              @onChange="value => setFilter(value)"
            />
          </div>
          <div
            v-if="userLogged && userLogged.isSuperAdmin"
            class="col-12 col-md-4"
          >
            <FilterSelect
              label="Client/Provedor"
              :options="collaborators"
              :value="filter.collaborator"
              filterProp="login"
              @onChange="value => setFilterCollaborator(value)"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              outlined
              readonly
              dense
              flat
              :value="totalTransactionToPay"
              type="number"
              prefix="Balance: "
            />
          </div>
        </div>
      </template>
      <template v-slot:loading>
        <Loader :loading="true" />
      </template>
      <template v-slot:body-cell-buttons="props">
        <q-td :props="props">
          <div>
            <q-btn unelevated color="primary" icon="more_vert" dense>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="() => showDetailsTransactionDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="assignment" />
                    </q-item-section>
                    <q-item-section>Details</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="() => showEditTransactionDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="edit" />
                    </q-item-section>
                    <q-item-section>Set Transaction Id</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <AddTransactionEditorDialog
      :showModal="showAddTransalationDialog"
      :close="() => (showAddTransalationDialog = false)"
    />
    <SetTransactionIdEditorDialog
      :showModal="showEditTransaction"
      :transaction="selectedTransaction"
      :close="() => (showEditTransaction = false)"
    />
    <ViewerTransactionDialog
      :showModal="showDetailsTransaction"
      :transaction="selectedTransaction"
      :close="() => (showDetailsTransaction = false)"
    />
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import {
  TransactionRecord,
  Dictionary,
  CollaboratorFilter,
  CollaboratorRecord
} from '../../models/models';
import { ColumnsTransactions } from './ColumnsTransactions';
import FilterSelect from '../FilterSelect.vue';
import AddTransactionEditorDialog from './TransactionsEditor/AddTransactionEditorDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import { TransactionTypeOptions } from '../../models/parsers';
import SetTransactionIdEditorDialog from './TransactionsEditor/SetTransactionIdEditorDialog.vue';
import ViewerTransactionDialog from './TransactionViewer/ViewerTransactionDialog.vue';
import { UserLogged } from 'src/modules/wgo/models/models';

@Component({
  components: {
    FilterSelect,
    AddTransactionEditorDialog,
    SetTransactionIdEditorDialog,
    ViewerTransactionDialog
  }
})
export default class Accountings extends Vue {
  @Action(githubActions.loadTransactions, { namespace: githubNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadAllCollaborators, { namespace: githubNamespace })
  loadCollaborators!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadAllAcounting, { namespace: githubNamespace })
  loadAcountings!: (force: boolean) => Promise<void>;
  @Getter(githubGetters.getTransactions, { namespace: githubNamespace })
  transactions!: TransactionRecord[];
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  collaborators!: Dictionary[];

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;

  loading = false;
  transactionFilterRecord: TransactionRecord[] = [];
  columns = ColumnsTransactions;
  filter: CollaboratorFilter = this.getFilterStore();
  showAddTransalationDialog = false;
  totalTransactionToPay = 0;
  transactionTypeOptions = TransactionTypeOptions();
  selectedTransaction: TransactionRecord | null = null;
  showEditTransaction = false;
  showDetailsTransaction = false;

  setFilter(value: Dictionary) {
    this.filter.type = value;
    localStorage.setItem(
      LocalStorageSettings.KEY_TRANSACTIONS_FILTER,
      JSON.stringify(this.filter)
    );
    this.filterTransactions();
  }

  setFilterCollaborator(value: CollaboratorRecord) {
    this.filter.collaborator = value;
    localStorage.setItem(
      LocalStorageSettings.KEY_TRANSACTIONS_FILTER,
      JSON.stringify(this.filter)
    );
    this.filterTransactions();
  }

  @Watch('transactions')
  filterTransactions() {
    this.transactionFilterRecord = !!this.filter
      ? this.transactions.filter(
          transaction =>
            (!this.filter.collaborator ||
              transaction.collaborator.login ===
                this.filter?.collaborator.login) &&
            (!this.filter.type || transaction.type === this.filter?.type.value)
        )
      : this.transactions;
    this.setTotalTransactionToPay();
  }

  setTotalTransactionToPay() {
    this.totalTransactionToPay = 0;
    const forUser: { [key: number]: number } = {};
    this.transactionFilterRecord.forEach(transaction => {
      this.totalTransactionToPay += transaction.cost;
      if (!(transaction.collaboratorId in forUser)) {
        forUser[transaction.collaboratorId] = transaction.card_balance;
      }
    });
  }

  getFilterStore() {
    const filters = localStorage.getItem(
      LocalStorageSettings.KEY_TRANSACTIONS_FILTER
    );
    return filters
      ? (JSON.parse(filters) as CollaboratorFilter)
      : <CollaboratorFilter>{};
  }

  showDetailsTransactionDialog(record: TransactionRecord) {
    this.selectedTransaction = record;
    this.showDetailsTransaction = true;
  }

  showEditTransactionDialog(record: TransactionRecord) {
    this.selectedTransaction = record;
    this.showEditTransaction = true;
  }

  async mounted() {
    this.loading = true;
    await this.loadData(false);
    await this.loadCollaborators(false);
    await this.loadAcountings(false);
    this.filterTransactions();
    this.loading = false;
  }
}
</script>

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
