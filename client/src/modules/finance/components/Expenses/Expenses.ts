import { Action, Getter } from 'vuex-class';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import { ExpenseRecord, FilterIncomeObj } from '../../models/models';
import { ColumnsExpenses } from './ColumnsExpenses';
import AddExpenseEditorDialog from './ExpensesEditor/AddExpenseEditorDialog.vue';
import ViewerExpenseDialog from './ExpenseViewer/ViewerExpenseDialog.vue';
import ConfirmDialog from '../../../wgo/components/ConfirmDialog/ConfirmDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import FilterSelect from '../FilterSelect.vue';
import { filterExpenses, repeatOption } from './FilterExpenses';
import { FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-shared';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../wgo/store/ComponentsState';
import { UserLogged } from 'src/modules/wgo/models/models';
import { INotify } from 'src/modules/wgo/models';

@Component({
  components: {
    AddExpenseEditorDialog,
    ViewerExpenseDialog,
    ConfirmDialog,
    FilterSelect
  }
})
export default class Expenses extends Vue {
  @Action(githubActions.loadExpenses, { namespace: githubNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadExpenseDetail, { namespace: githubNamespace })
  loadDetails!: (record: ExpenseRecord) => Promise<ExpenseRecord>;
  @Action(githubActions.changeExpenseStatus, { namespace: githubNamespace })
  changeStatus!: (status: ExpenseRecord) => Promise<boolean>;
  @Action(githubActions.loadAllCollaborators, { namespace: githubNamespace })
  loadCollaborators!: (force: boolean) => Promise<void>;
  @Getter(githubGetters.getExpenses, { namespace: githubNamespace })
  expenses!: ExpenseRecord[];
  filterExpenses: ExpenseRecord[] = this.expenses;

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  loading = false;
  columns = ColumnsExpenses;
  showAddExpenseDialog = false;
  showConfirmPayDialog = false;
  showViewExpenseDialog = false;
  selectedExpense: ExpenseRecord | null = null;
  textConfirm = 'Are you sure you want to change the status to "payed"?';
  repeatOption = repeatOption;

  clientFilter = '';
  minDateFilter = '';
  maxDateFilter = '';
  repeatFilter: { label: string; value: number } | null = null;
  filter: FilterIncomeObj;

  constructor() {
    super();
    this.filterExpenses = this.expenses ? this.expenses : [];
    this.filter =
      this.getFilterStore() ||
      <FilterIncomeObj>{
        minDate: undefined,
        maxDate: undefined,
        repeat: undefined,
        client: ''
      };
    if (this.filter) {
      this.clientFilter = this.filter.client || '';
      this.minDateFilter = this.filter.minDate || '';
      this.maxDateFilter = this.filter.maxDate || '';
      this.repeatFilter =
        !!this.filter.repeat || this.filter.repeat === 0
          ? this.repeatOption.filter(opt => opt.value === this.filter.repeat)[0]
          : null;
    }
  }

  showConfimDialog(record: ExpenseRecord) {
    this.selectedExpense = record;
    this.showConfirmPayDialog = true;
  }

  async showEditExpenseDialog(record: ExpenseRecord | null) {
    if (record) {
      this.loading = true;
      const expense = record ? await this.loadDetails(record) : record;
      this.loading = false;
      this.selectedExpense = expense;
    } else {
      this.selectedExpense = record;
    }

    this.showAddExpenseDialog = true;
  }

  async showExpenseDialog(record: ExpenseRecord) {
    this.loading = true;
    const expense = await this.loadDetails(record);
    this.loading = false;
    this.selectedExpense = expense;
    this.showViewExpenseDialog = true;
  }

  @Watch('filter')
  @Watch('expenses')
  setfilterExpenses() {
    localStorage.setItem(
      LocalStorageSettings.KEY_EXPENSES_FILTER,
      JSON.stringify(this.filter)
    );
    this.filterExpenses = filterExpenses(this.expenses, this.filter);
  }

  @Watch('clientFilter')
  setClient() {
    this.filter = { ...this.filter, client: this.clientFilter };
  }

  @Watch('minDateFilter')
  setMinDate() {
    if (this.minDateFilter) {
      const date = new Date(this.minDateFilter);
      date.setHours(0, 0);
      if (date && date.toString() !== 'Invalid Date') {
        this.filter = { ...this.filter, minDate: this.minDateFilter };
        return;
      }
    }
    this.filter = { ...this.filter, minDate: undefined };
  }

  @Watch('maxDateFilter')
  setMaxDate() {
    if (this.maxDateFilter) {
      const date = new Date(this.maxDateFilter);
      date.setHours(23, 59);
      if (date && date.toString() !== 'Invalid Date') {
        this.filter = { ...this.filter, maxDate: this.maxDateFilter };
        return;
      }
    }
    this.filter = { ...this.filter, maxDate: undefined };
  }

  setRepeat(prop: { value: FrequencyRepeatEnum } | null) {
    this.filter = { ...this.filter, repeat: prop ? prop.value : undefined };
  }

  async changeStatusToPayed(confirm: boolean) {
    this.showConfirmPayDialog = false;
    if (confirm && this.selectedExpense) {
      this.loading = true;
      if (
        await this.changeStatus(<ExpenseRecord>{
          id: this.selectedExpense.id,
          status: 2
        })
      ) {
        this.notify({
          message: 'Expense status changed successfully ',
          type: 'positive'
        });
      }
      this.loading = false;
    }
  }

  getFilterStore() {
    const filters = localStorage.getItem(
      LocalStorageSettings.KEY_EXPENSES_FILTER
    );
    return filters ? (JSON.parse(filters) as FilterIncomeObj) : null;
  }

  async mounted() {
    this.loading = true;
    await this.loadData(false);
    await this.loadCollaborators(false);
    this.setfilterExpenses();
    this.loading = false;
  }
}
