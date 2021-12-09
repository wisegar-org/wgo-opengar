import { Vue, Component, Watch } from 'vue-property-decorator';
import FilterSelect from '../FilterSelect.vue';
import {
  Dictionary,
  ColumnTable,
  OptionFilter,
  FilterIssuesModel,
  FiltersIsuesKeys,
  IssuesRecord,
  OrganizationDataRecord
} from '../../models/models';
import { exportTable } from './ExportIssues';
import { IssuesService } from '../../services/IssuesService';
import { ColumnsIssues } from './ColumnsIssues';
import { filterIssues } from './FilterIssues';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import AccountingStepperDialog from '../Accounting/AccountingStepper/AccountingStepperDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import IssuesToolbar from './IssuesToolbar.vue';
import { UserLogged } from 'src/modules/wgo/models/models';
import { PropToEdit } from 'src/modules/wgo/components/ExpandableList/models';
import IssuesList from './IssuesList/IssuesList.vue';
import IssuesFilter from './IssuesFilter/IssuesFilter.vue';
import ExpandableListFilterLabel from '../../../wgo/components/ExpandableList/ExpandableListFilter/ExpandableListFilterLabel.vue';

@Component({
  components: {
    FilterSelect,
    AccountingStepperDialog,
    IssuesToolbar,
    IssuesList,
    IssuesFilter,
    ExpandableListFilterLabel
  }
})
export default class Issues extends Vue {
  @Action(githubActions.loadAllIssuesData, { namespace: githubNamespace })
  getAllData!: (force: boolean) => Promise<void>;
  githubData: Dictionary = { error: '' };

  showAccountingStepper = false;
  showDetailDialog = false;
  issueSelected: IssuesRecord | null = null;
  filteredIssues: IssuesRecord[] = [];
  pageIssues: IssuesRecord[] = [];
  columns: PropToEdit[] = ColumnsIssues;
  exportTableFn = exportTable;

  @Getter(githubGetters.getIssues, { namespace: githubNamespace })
  issues!: IssuesRecord[];
  @Getter(githubGetters.getMilestones, { namespace: githubNamespace })
  optionsMilestones!: OptionFilter[];
  @Getter(githubGetters.getLabels, { namespace: githubNamespace })
  optionsLabels!: OptionFilter[];
  @Getter(githubGetters.getProjects, { namespace: githubNamespace })
  optionsProjects!: OptionFilter[];
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  optionsCollaborators!: OptionFilter[];
  @Getter(githubGetters.getRepositories, { namespace: githubNamespace })
  optionsRepository!: OptionFilter[];
  @Getter(githubGetters.getOrganizationData, { namespace: githubNamespace })
  organizationData!: OrganizationDataRecord;

  optionsStatus: OptionFilter[] = [
    { id: 1, label: 'Accounted', title: 'Accounted' },
    { id: 2, label: 'Pending', title: 'Pending' }
  ];

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;
  loading = true;
  maxPage = 0;
  currentPage = 1;
  itemsByPage = 10;
  itemsCount = 0;

  itemByPageOptions = [5, 10, 20, 50, 100];

  filters: FilterIssuesModel = this.getFilterStore();
  filterStr = this.getFilterStr(this.filters);
  showFilter = false;
  headerButtons: { icon: string; tooltip: string; click: () => unknown }[] = [
    {
      click: () => {
        this.syncroGithubData();
      },
      icon: 'sync',
      tooltip: 'Sync Data'
    },
    {
      click: () => {
        this.openFilterDialog();
      },
      icon: 'filter_alt',
      tooltip: 'Set Filter'
    }
  ];
  emptyFilter = {
    milestones: null,
    labels: null,
    project: null,
    assignedTo: null,
    repository: null,
    minDate: null,
    maxDate: null,
    status: null
  };

  openIssueDetail(selected: IssuesRecord) {
    this.issueSelected = selected;
    this.showDetailDialog = true;
  }

  applyFilter(filters: FilterIssuesModel) {
    this.filters = filters;
    localStorage.setItem(
      LocalStorageSettings.KEY_ISSUES_FILTER,
      JSON.stringify(this.filters)
    );
    this.filterStr = this.getFilterStr(filters);
    this.applyFilterToIssues();
  }

  getFilterStr(filters: FilterIssuesModel) {
    if (!filters) return '';
    const result: string[] = [];
    if (filters.repository)
      result.push(`Repository contain <${filters.repository.label}>`);
    if (filters.labels) result.push(`Labels contain <${filters.labels.label}>`);
    if (filters.status) result.push(`Status contain <${filters.status.label}>`);
    if (filters.assignedTo)
      result.push(`Assigned to contain <${filters.assignedTo.label}>`);
    if (filters.minDate) result.push(`Start date contain <${filters.minDate}>`);
    if (filters.maxDate) result.push(`End date contain <${filters.maxDate}>`);
    return result.join(' and ');
  }

  async syncroGithubData() {
    this.loading = true;
    const update = await IssuesService.databaseUpdate();
    if (update) {
      await this.loadData();
    } else {
      this.loading = false;
    }
    this.applyFilterToIssues();
  }

  @Watch('issues')
  applyFilterToIssues() {
    this.filteredIssues = filterIssues(this.issues, this.filters);
  }

  async loadData() {
    await this.getAllData(false);
    this.filters = this.getFilterStore();
    this.applyFilterToIssues();
    this.loading = false;
  }

  openFilterDialog() {
    this.showFilter = true;
  }

  getFilterStore() {
    const filtersJson = localStorage.getItem(
      LocalStorageSettings.KEY_ISSUES_FILTER
    );
    if (filtersJson) {
      const filter = JSON.parse(filtersJson) as FilterIssuesModel;
      if (filter.assignedTo && this.optionsCollaborators) {
        const colls = this.optionsCollaborators.filter(
          coll => coll.id === filter.assignedTo?.id
        );
        filter.assignedTo =
          colls.length === 1 ? { ...filter.assignedTo, ...colls[0] } : null;
      }
      this.filterStr = this.getFilterStr(filter);
      return filter;
    }
    return this.emptyFilter;
  }

  getOptionsCollaborators() {
    return this.optionsCollaborators.filter(coll => coll.isCollaborator);
  }

  async mounted() {
    this.loading = true;
    await this.loadData();
  }
}
