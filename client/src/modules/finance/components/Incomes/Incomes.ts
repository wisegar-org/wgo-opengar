import { Action, Getter } from 'vuex-class';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import { FilterIncomeObj, IncomeRecord } from '../../models/models';
import { ColumnsIncomes } from './ColumnsIncomes';
import AddIncomeEditorDialog from './IncomesEditor/AddIncomeEditorDialog.vue';
import ViewerIncomeDialog from './IncomeViewer/ViewerIncomeDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { filterIncomes, repeatOption } from './FilterIncomes';
import { FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-shared';
import FilterSelect from '../FilterSelect.vue';
import ConfirmDialog from '../../../wgo/components/ConfirmDialog/ConfirmDialog.vue';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../wgo/store/ComponentsState';
import { UserLogged } from 'src/modules/wgo/models/models';
import { INotify } from 'src/modules/wgo/models';

@Component({
  components: {
    AddIncomeEditorDialog,
    ViewerIncomeDialog,
    FilterSelect,
    ConfirmDialog
  }
})
export default class Incomes extends Vue {
  @Action(githubActions.loadIncomes, { namespace: githubNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadIncomeDetail, { namespace: githubNamespace })
  loadDetails!: (income: IncomeRecord) => Promise<IncomeRecord | null>;
  @Getter(githubGetters.getIncomes, { namespace: githubNamespace })
  incomes!: IncomeRecord[];
  @Action(githubActions.changeIncomeStatus, { namespace: githubNamespace })
  changeStatus!: (status: IncomeRecord) => Promise<boolean>;
  @Action(githubActions.loadAllCollaborators, { namespace: githubNamespace })
  loadCollaborators!: (force: boolean) => Promise<void>;

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  loading = false;
  columns = ColumnsIncomes;
  showAddIncomeDialog = false;
  showConfirmPayDialog = false;
  showViewIncomeDialog = false;
  selectedIncome: IncomeRecord | null = null;
  textConfirm = 'Are you sure you want to change the status to "payed"?';
  filterIncomes: IncomeRecord[];

  clientFilter = '';
  minDateFilter = '';
  maxDateFilter = '';
  repeatFilter: { label: string; value: number } | null = null;
  filter: FilterIncomeObj;

  repeatOption = repeatOption;

  constructor() {
    super();
    this.filterIncomes = this.incomes ? this.incomes : [];
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

  showConfimDialog(record: IncomeRecord) {
    this.selectedIncome = record;
    this.showConfirmPayDialog = true;
  }

  async showEditIncomeDialog(record: IncomeRecord | null) {
    if (record) {
      this.loading = true;
      const income = await this.loadDetails(record);
      this.loading = false;
      this.selectedIncome = income;
    } else {
      this.selectedIncome = record;
    }
    this.showAddIncomeDialog = true;
  }

  async showIncomeDialog(record: IncomeRecord) {
    this.loading = true;
    const income = await this.loadDetails(record);
    this.loading = false;
    this.selectedIncome = income;
    this.showViewIncomeDialog = true;
  }

  @Watch('filter')
  @Watch('incomes')
  setFilterIncomes() {
    localStorage.setItem(
      LocalStorageSettings.KEY_INCOME_FILTER,
      JSON.stringify(this.filter)
    );
    this.filterIncomes = filterIncomes(this.incomes, this.filter);
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

  setRepeat(porp: { value: number }) {
    this.filter = {
      ...this.filter,
      repeat: porp ? (porp.value as FrequencyRepeatEnum) : undefined
    };
  }

  async changeStatusToPayed(confirm: boolean) {
    this.showConfirmPayDialog = false;
    if (confirm && this.selectedIncome) {
      this.loading = true;
      if (
        await this.changeStatus(<IncomeRecord>{
          id: this.selectedIncome.id,
          status: 2
        })
      ) {
        this.notify({
          message: 'Income status changed successfully ',
          type: 'positive'
        });
      }
      this.loading = false;
    }
  }

  getFilterStore() {
    const filters = localStorage.getItem(
      LocalStorageSettings.KEY_INCOME_FILTER
    );
    return filters ? (JSON.parse(filters) as FilterIncomeObj) : null;
  }

  async mounted() {
    this.loading = true;
    await this.loadData(false);
    await this.loadCollaborators(false);
    this.setFilterIncomes();
    this.loading = false;
  }
}
