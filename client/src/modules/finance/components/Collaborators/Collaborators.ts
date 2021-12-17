import { Action, Getter } from 'vuex-class';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import { CollaboratorRecord } from '../../models/models';
import { ColumnsCollaborators } from './ColumnsCollaborators';
import EditAccountingCollaboratorDialog from './EditCollaborator/EditAccountingCollaboratorDialog.vue';
import StatsCollaboratorDialog from './StatsCollaborator/StatsCollaboratorDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { UserLogged } from '../../../wgo/models';
import CollaboratorList from './CollaboratorList/CollaboratorList.vue';
import ExpandableListFilterLabel from '../../../wgo/components/ExpandableList/ExpandableListFilter/ExpandableListFilterLabel.vue';
import {
  ITranslationFinanceCollaboratorKeys,
  TranslationsKeys,
  WGO_FINANCE_COLLABORATOR_COLUMN_EMAIL,
  WGO_FINANCE_COLLABORATOR_COLUMN_NAME,
  WGO_FINANCE_COLLABORATOR_COLUMN_ROLE,
  WGO_FINANCE_COLLABORATOR_COLUMN_URL,
  WGO_FINANCE_COLLABORATOR_SET_FILTER_BTN
} from './TranslationsKeys';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { FilterCollaborator, IFilterCollaborator } from './FilterCollaborator';
import CollaboratorsFilterDialog from './CollaboratorsFilter/CollaboratorsFilterDialog.vue';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';

@Component({
  components: {
    EditAccountingCollaboratorDialog,
    StatsCollaboratorDialog,
    CollaboratorList,
    ExpandableListFilterLabel,
    CollaboratorsFilterDialog
  }
})
export default class Collaborators extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceCollaboratorKeys;
  @Action(githubActions.loadAllCollaborators, { namespace: githubNamespace })
  loadData!: () => Promise<void>;
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  collaborators!: CollaboratorRecord[];

  collaboratorFiltered!: CollaboratorRecord[];
  loading = false;
  columns = ColumnsCollaborators;
  collaboratorSelected: CollaboratorRecord | null = null;
  showEditor = false;
  showStats = false;
  showFilter = false;

  filters: IFilterCollaborator = this.getFilterStore();
  setFilterBtn = {
    click: () => {
      this.openFilterDialog();
    },
    icon: 'filter_alt',
    tooltip: 'Set Filter'
  };
  headerButtons = [this.setFilterBtn];
  filterStr = '';

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;

  openFilterDialog() {
    this.showFilter = true;
  }

  openEditor(item: CollaboratorRecord | null) {
    this.collaboratorSelected = item;
    this.showEditor = true;
  }

  showStatsDialog(item: CollaboratorRecord) {
    this.collaboratorSelected = item;
    this.showStats = true;
  }
  @Watch('collaborators')
  @Watch('translationContent')
  setFilterCollaborators() {
    this.collaboratorFiltered = FilterCollaborator(
      this.collaborators,
      this.filters
    ).map(coll => this.updateContent(coll));
    this.filterStr = this.getFilterStr(this.filters);
    this.setFilterBtn.tooltip = this.getLabel(
      WGO_FINANCE_COLLABORATOR_SET_FILTER_BTN
    );
  }

  updateContent(coll: CollaboratorRecord) {
    coll.typeTranslation = coll.type
      .split(',')
      .filter(str => str in this.translationContent)
      .map(str => (this.translationContent as any)[str])
      .join(', ');
    return coll;
  }

  applyFilter(filter: IFilterCollaborator) {
    this.filters = { ...filter };
    localStorage.setItem(
      LocalStorageSettings.KEY_COLLABORATORS_FILTER,
      JSON.stringify(this.filters)
    );
    this.setFilterCollaborators();
    this.filterStr = this.getFilterStr(this.filters);
  }

  getFilterStore() {
    const filtersJson = localStorage.getItem(
      LocalStorageSettings.KEY_COLLABORATORS_FILTER
    );
    if (filtersJson) {
      const filter = JSON.parse(filtersJson) as IFilterCollaborator;
      if (filter) {
        this.filters = { ...filter };
      }
      this.filterStr = this.getFilterStr(filter);
      return filter;
    }
    return <IFilterCollaborator>{};
  }

  getFilterStr(filters: IFilterCollaborator) {
    const equalLabel = this.getLabel('WGO_EQUAL_LABEL');
    const containLabel = this.getLabel('WGO_CONTAIN_LABEL');
    const andLabel = this.getLabel('WGO_AND_LABEL');
    if (!filters) return '';
    const result: string[] = [];
    if (filters.name)
      result.push(
        `${this.getLabel(
          WGO_FINANCE_COLLABORATOR_COLUMN_NAME
        )} ${containLabel} <${filters.name}>`
      );
    if (filters.email)
      result.push(
        `${this.getLabel(
          WGO_FINANCE_COLLABORATOR_COLUMN_EMAIL
        )} ${containLabel} <${filters.name}>`
      );
    if (filters.type)
      result.push(
        `${this.getLabel(
          WGO_FINANCE_COLLABORATOR_COLUMN_ROLE
        )} ${equalLabel} <${this.getLabel(filters.type)}>`
      );
    if (filters.url)
      result.push(
        `${this.getLabel(
          WGO_FINANCE_COLLABORATOR_COLUMN_URL
        )} ${containLabel} <${filters.url}>`
      );

    return result.join(` ${andLabel} `);
  }

  getLabel(label: string) {
    if (this.translationContent && label in this.translationContent)
      return (this.translationContent as any)[label];
    return label;
  }

  async mounted() {
    if (this.collaborators.length === 0) {
      this.loading = true;
      await this.loadData();
      this.applyFilter(this.getFilterStore());
      this.loading = false;
    }
    await this.registerTranslations(TranslationsKeys);
  }
}
