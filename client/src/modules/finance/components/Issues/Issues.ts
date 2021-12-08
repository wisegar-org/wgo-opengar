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
import IssueDetailsDialog from './IssueDetailsDialog/IssueDetailsDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import IssuesToolbar from './IssuesToolbar.vue';
import { UserLogged } from 'src/modules/wgo/models/models';

@Component({
  components: {
    FilterSelect,
    AccountingStepperDialog,
    IssueDetailsDialog,
    IssuesToolbar
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
  columns: ColumnTable[] = ColumnsIssues;
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

  filters: FilterIssuesModel = this.getFilterStore();

  openIssueDetail(selected: IssuesRecord) {
    this.issueSelected = selected;
    this.showDetailDialog = true;
  }

  setFilter(prop: FiltersIsuesKeys, value: OptionFilter | null) {
    this.filters[prop] = value;
    localStorage.setItem(
      LocalStorageSettings.KEY_ISSUES_FILTER,
      JSON.stringify(this.filters)
    );
    this.applyFilterToIssues();
  }

  @Watch('filters.minDate')
  @Watch('filters.maxDate')
  setDateFilter() {
    localStorage.setItem(
      LocalStorageSettings.KEY_ISSUES_FILTER,
      JSON.stringify(this.filters)
    );
    this.applyFilterToIssues();
  }

  getHourIssues() {
    return this.filteredIssues
      .map(issues => (issues.hours ? issues.hours : 0))
      .reduce((a, b) => a + b, 0);
  }

  getExportData() {
    const issueRecord = {
      assignedTo: { login: '' },
      assignedToId: 0,
      number: 0,
      milestones: '',
      labels: '',
      project: { title: '', id: 0 },
      repository: { title: '', id: 0 },
      id: '',
      title: '',
      status: '',
      hours: '',
      collaborators: '',
      url: '',
      closed_at: '',
      created_at: '',
      description: '',
      last_comment: '',
      accountId: 0
    } as IssuesRecord;
    return this.filteredIssues.concat([
      issueRecord,
      {
        ...issueRecord,
        milestones: 'Total',
        hours: this.getHourIssues()
      }
    ]);
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
      return filter;
    }
    return {
      milestones: null,
      labels: null,
      project: null,
      assignedTo: null,
      repository: null,
      minDate: null,
      maxDate: null,
      status: null
    };
  }

  getOptionsCollaborators() {
    return this.optionsCollaborators.filter(coll => coll.isCollaborator);
  }

  async mounted() {
    this.loading = true;
    await this.loadData();
  }
}
