import { openURL } from 'quasar';
import { IssuesRecord } from 'src/modules/finance';
import {
  ExpandableListOptions,
  ListItem,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import ExpandableList from '../../../../wgo/components/ExpandableList/ExpandableList.vue';
import IssueDetails from '../IssueDetailsDialog/IssueDetails.vue';
import {
  ITranslationFinanceIssuesKeys,
  TranslationsKeys
} from '../TranslationsKeys';

@Component({
  components: {
    ExpandableList,
    IssueDetails
  }
})
export default class IssuesList extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceIssuesKeys;
  @Prop() loading!: boolean;
  @Prop({ default: '' }) filterStr!: boolean;
  @Prop() issues!: IssuesRecord[];
  @Prop() columns!: PropToEdit[];
  @Prop() headerButtons!: {
    icon: string;
    tooltip: string;
    click: () => unknown;
  }[];

  innerLoading = false;
  pageIssues: IssuesRecord[] = [];
  maxPage = 0;
  currentPage = 1;
  itemsByPage = 10;
  itemsCount = 0;

  goToGithubBtn = {
    click: (item: ListItem) => {
      this.goToGithub(item);
    },
    icon: 'visibility',
    tooltip: 'Go to Github'
  };

  itemByPageOptions = [5, 10, 20, 50, 100];
  options = <ExpandableListOptions>{
    showAddBotton: false,
    expandedButtons: [this.goToGithubBtn],
    labelShowAddBotton: '',
    textDeleteConfirm: '',
    disableFilters: true,
    onAddItem: () => null,
    onDeleteItem: () => null,
    onEditItem: () => null,
    headerButtons: this.headerButtons
  };

  /**
   *
   */
  constructor() {
    super();
    this.$nextTick(() => this.updatePageIssues());
  }

  @Watch('issues')
  @Watch('currentPage')
  @Watch('itemsByPage')
  updatePageIssues() {
    const startIndex = (this.currentPage - 1) * this.itemsByPage;
    this.pageIssues = this.issues.slice(
      startIndex,
      startIndex + this.itemsByPage
    );
    this.itemsCount = this.issues.length;
    this.maxPage =
      Math.floor(this.itemsCount / this.itemsByPage) +
      (this.itemsCount % this.itemsByPage > 0 ? 1 : 0);
  }

  getHourIssues() {
    return this.issues
      .map(iss => (iss.hours ? iss.hours : 0))
      .reduce((a, b) => a + b, 0);
  }

  goToGithub(issue: ListItem) {
    openURL((issue as any).url.replace('api.github.com/repos', 'github.com'));
  }

  @Watch('translationContent')
  updateTranslations() {
    this.goToGithubBtn.tooltip =
      this.translationContent &&
      'WGO_FINANCE_ISSUES_GO_TO_GITHUB_BTN' in this.translationContent
        ? this.translationContent.WGO_FINANCE_ISSUES_GO_TO_GITHUB_BTN
        : 'Go to Github';
  }

  async mounted() {
    this.innerLoading = true;
    await this.registerTranslations(TranslationsKeys);
    this.updateTranslations();
    this.innerLoading = false;
  }
}
