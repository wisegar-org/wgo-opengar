<template>
  <div
    v-if="userLogged && (userLogged.isSuperAdmin || userLogged.isCustomer)"
    class="q-px-xl"
    style="width: 100%"
  >
    <div class="row" style="justify-content: space-around">
      <StatsComponent
        :icon="issuesConfig.icon"
        :title="issuesConfig.label"
        text="Issues for pay"
        :value="homeProps.issuesCount || 0"
        :path="issuesConfig.to"
      />
      <StatsComponent
        :icon="issuesConfig.icon"
        :title="issuesConfig.label"
        text="Hours for pay"
        :value="homeProps.issuesHours || 0"
        :path="issuesConfig.to"
      />
      <StatsComponent
        :icon="accountingConfig.icon"
        :title="accountingConfig.label"
        text="Accounting to confirm"
        :value="homeProps.accountsToConfirm || 0"
        :path="accountingConfig.to"
      />
    </div>
    <div
      v-if="userLogged && userLogged.isSuperAdmin"
      class="row"
      style="justify-content: space-around"
    >
      <StatsComponent
        :icon="incomesConfig.icon"
        :title="incomesConfig.label"
        text="Total Incomes Value"
        :value="homeProps.totalIncomeValue || 0"
        :path="incomesConfig.to"
      />
      <StatsComponent
        :icon="incomesConfig.icon"
        :title="incomesConfig.label"
        text="Total Count in last Mouth"
        :value="homeProps.totalIncomeMouthCount || 0"
        :path="incomesConfig.to"
      />
      <StatsComponent
        :icon="incomesConfig.icon"
        :title="incomesConfig.label"
        text="Total Value in last Mouth"
        :value="homeProps.totalIncomeMouthValue || 0"
        :path="incomesConfig.to"
      />
    </div>
    <div
      v-if="userLogged && userLogged.isSuperAdmin"
      class="row"
      style="justify-content: space-around"
    >
      <StatsComponent
        :icon="expensesConfig.icon"
        :title="expensesConfig.label"
        text="Total Expenses Value"
        :value="homeProps.totalExpenseValue || 0"
        :path="expensesConfig.to"
      />
      <StatsComponent
        :icon="expensesConfig.icon"
        :title="expensesConfig.label"
        text="Total count in las mouth"
        :value="homeProps.totalExpenseMouthCount || 0"
        :path="expensesConfig.to"
      />
      <StatsComponent
        :icon="expensesConfig.icon"
        :title="expensesConfig.label"
        text="Total value in las mouth"
        :value="homeProps.totalExpenseMouthValue || 0"
        :path="expensesConfig.to"
      />
    </div>
    <div v-if="userLogged && userLogged.isSuperAdmin" class="row">
      <div class="col-12 col-md-6">
        <TableReview
          :title="titleIncomeTable"
          :data="incomes"
          :columns="columnIncome"
        />
      </div>
      <div class="col-12 col-md-6">
        <TableReview
          :title="titleExpenseTable"
          :data="expenses"
          :columns="columnExpense"
        />
      </div>
    </div>
    <div
      v-if="userLogged && !userLogged.isSuperAdmin"
      class="row content-center justify-center"
    >
      <div class="col-12 col-md-10">
        <TableReview
          :title="titleIssuesTable"
          :data="issues"
          :columns="columnIssues"
        />
      </div>
      <div class="col-12 col-md-10">
        <TableReview
          :title="titleAccountTable"
          :data="accounts"
          :columns="columnAccount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import StatsComponent from './StatsComponent.vue';
import TableReview from './TableReview.vue';
import { IssuesBC, AccountingBC, IncomesBC, ExpensesBC } from '../../router';
import {
  ColumnAccountHome,
  ColumnExpenseHome,
  ColumnIncomeHome,
  ColumnIssuesHome
} from './ColumnsHome';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import {
  AccountRecord,
  DictionaryNumber,
  ExpenseRecord,
  IncomeRecord,
  IssuesRecord
} from '../../models/models';
import { ApiSettings } from '../../settings/ApiSettings';
import { UserLogged } from 'src/modules/wgo/models/models';

@Component({ components: { StatsComponent, TableReview } })
export default class FinanceHome extends Vue {
  @Getter(githubGetters.getHomeProps, { namespace: githubNamespace })
  homeProps!: DictionaryNumber;
  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;
  @Getter(githubGetters.getIncomes, { namespace: githubNamespace })
  incomes!: IncomeRecord[];
  @Getter(githubGetters.getExpenses, { namespace: githubNamespace })
  expenses!: ExpenseRecord[];
  @Getter(githubGetters.getIssues, { namespace: githubNamespace })
  issues!: IssuesRecord[];
  @Getter(githubGetters.getAccounting, { namespace: githubNamespace })
  accounts!: AccountRecord[];
  @Action(githubActions.getHomeContent, { namespace: githubNamespace })
  homeStats!: (isAdmin: boolean) => DictionaryNumber;
  @Action(githubActions.loadHomeData, { namespace: githubNamespace })
  homeData!: (isAdmin: boolean) => Promise<void>;

  issuesConfig = IssuesBC;
  accountingConfig = AccountingBC;
  incomesConfig = IncomesBC;
  expensesConfig = ExpensesBC;

  titleExpenseTable = 'Last Expenses';
  titleIncomeTable = 'Last Incomes';
  titleIssuesTable = 'Last Issues';
  titleAccountTable = 'Last Account';

  columnExpense = ColumnExpenseHome;
  columnIncome = ColumnIncomeHome;
  columnIssues = ColumnIssuesHome;
  columnAccount = ColumnAccountHome;

  @Watch('userLogged')
  @Watch('issues')
  @Watch('accounts')
  @Watch('expenses')
  @Watch('incomes')
  getStats() {
    this.homeStats(this.userLogged?.isSuperAdmin);
  }

  @Watch('userLogged')
  async loadData() {
    await this.homeData(this.userLogged?.isSuperAdmin);
    this.getStats();
  }

  async created() {
    await this.loadData();
  }
}
</script>
