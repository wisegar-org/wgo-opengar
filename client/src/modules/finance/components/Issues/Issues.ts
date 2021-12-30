import { Vue, Component, Watch } from 'vue-property-decorator';
import FilterSelect from '../FilterSelect.vue';
import {
  OptionFilter,
  FilterIssuesModel,
  IssuesRecord,
  OrganizationDataRecord
} from '../../models/models';
import { IssuesService } from '../../services/IssuesService';
import { ColumnsIssues, setColumnsLanguage } from './ColumnsIssues';
import { filterIssues } from './FilterIssues';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import AccountingStepperDialog from '../Accounting/AccountingStepper/AccountingStepperDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import { UserLogged } from 'src/modules/wgo/models/models';
import {
  ExpandableHeaderButton,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';
import IssuesList from './IssuesList/IssuesList.vue';
import IssuesFilter from './IssuesFilter/IssuesFilter.vue';
import ExpandableListFilterLabel from '../../../wgo/components/ExpandableList/ExpandableListFilter/ExpandableListFilterLabel.vue';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import {
  ITranslationFinanceIssuesKeys,
  TranslationsKeys,
  WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO,
  WGO_FINANCE_ISSUES_COLUMN_END_DATE,
  WGO_FINANCE_ISSUES_COLUMN_LABEL,
  WGO_FINANCE_ISSUES_COLUMN_REPOSITORY,
  WGO_FINANCE_ISSUES_COLUMN_START_DATE,
  WGO_FINANCE_ISSUES_COLUMN_STATUS
} from './TranslationsKeys';

@Component({
  components: {
    FilterSelect,
    AccountingStepperDialog,
    IssuesList,
    IssuesFilter,
    ExpandableListFilterLabel
  }
})
export default class Issues extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceIssuesKeys;

  @Action(githubActions.loadAllIssuesData, { namespace: githubNamespace })
  getAllData!: (force: boolean) => Promise<void>;

  showAccountingStepper = false;
  filteredIssues: IssuesRecord[] = [];
  columns: PropToEdit[] = ColumnsIssues;

  @Getter(githubGetters.getIssues, { namespace: githubNamespace })
  issues!: IssuesRecord[];
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  optionsCollaborators!: OptionFilter[];
  @Getter(githubGetters.getOrganizationData, { namespace: githubNamespace })
  organizationData!: OrganizationDataRecord;
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

  filters: FilterIssuesModel = this.getFilterStore() || this.emptyFilter;
  filterStr = this.getFilterStr(this.filters);
  showFilter = false;
  headerButtons: ExpandableHeaderButton[] = [
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
    const equalLabel = this.getLabel('WGO_EQUAL_LABEL');
    const containLabel = this.getLabel('WGO_CONTAIN_LABEL');
    const andLabel = this.getLabel('WGO_AND_LABEL');
    if (!filters) return '';
    const result: string[] = [];
    if (filters.repository)
      result.push(
        `${this.getLabel(
          WGO_FINANCE_ISSUES_COLUMN_REPOSITORY
        )} ${equalLabel} <${filters.repository.label}>`
      );
    if (filters.labels)
      result.push(
        `${this.getLabel(WGO_FINANCE_ISSUES_COLUMN_LABEL)} ${containLabel} <${
          filters.labels.label
        }>`
      );
    if (filters.status)
      result.push(
        `${this.getLabel(WGO_FINANCE_ISSUES_COLUMN_STATUS)} ${equalLabel} <${
          filters.status.label
        }>`
      );
    if (filters.assignedTo)
      result.push(
        `${this.getLabel(WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO)} <${
          filters.assignedTo.label
        }>`
      );
    if (filters.minDate)
      result.push(
        `${this.getLabel(
          WGO_FINANCE_ISSUES_COLUMN_START_DATE
        )} ${equalLabel} <${filters.minDate}>`
      );
    if (filters.maxDate)
      result.push(
        `${this.getLabel(WGO_FINANCE_ISSUES_COLUMN_END_DATE)} ${equalLabel} <${
          filters.maxDate
        }>`
      );
    return result.join(` ${andLabel} `);
  }

  getLabel(label: string) {
    if (this.translationContent && label in this.translationContent)
      return (this.translationContent as any)[label];
    return label;
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

  @Watch('translationContent')
  setColumnsLabels() {
    this.filterStr = this.getFilterStr(this.filters);
    setColumnsLanguage(this.translationContent);
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

  async mounted() {
    this.loading = true;
    await this.registerTranslations(TranslationsKeys);
    this.setColumnsLabels();
    await this.loadData();
  }
}
