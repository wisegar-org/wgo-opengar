import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import ExpandableList from 'src/modules/wgo/components/ExpandableList/ExpandableList.vue';
import ViewAccountingCollaborator from '../EditCollaborator/ViewAccountingCollaborator.vue';
import {
  CollaboratorRecord,
  githubActions,
  githubGetters,
  githubNamespace
} from 'src/modules/finance';
import { Action, Getter } from 'vuex-class';
import {
  ExpandableButton,
  ExpandableListOptions,
  ListItem,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { TranslationsKeys } from '../TranslationsKeys';
import { openURL } from 'quasar';

@Component({
  components: {
    ExpandableList,
    ViewAccountingCollaborator
  }
})
export default class CollaboratorList extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: any;
  @Prop() loading!: boolean;
  @Prop({ default: '' }) filterStr!: boolean;
  @Prop() collaborators!: CollaboratorRecord[];
  @Prop() columns!: PropToEdit[];
  @Prop() headerButtons!: {
    icon: string;
    tooltip: string;
    click: () => unknown;
  }[];
  @Prop() editCollaborator!: (coll: CollaboratorRecord) => unknown;

  pageCollaborators: CollaboratorRecord[] = [];
  innerLoading = false;
  maxPage = 0;
  currentPage = 1;
  itemsByPage = 10;
  itemsCount = 0;

  goToGithubBtn: ExpandableButton = {
    click: (item?: ListItem) => {
      if (item) this.goToGithub(item);
    },
    icon: 'visibility',
    tooltip: 'Go to Github',
    disabled: (item?: ListItem) => {
      return !!item && !item.isCollaborator;
    }
  };

  editCollaboratorBn: ExpandableButton = {
    click: (item?: ListItem) =>
      this.editCollaborator((item as any) as CollaboratorRecord),
    icon: 'edit',
    tooltip: 'Edit'
  };

  itemByPageOptions = [5, 10, 20, 50, 100];
  options = <ExpandableListOptions>{
    showAddBotton: false,
    expandedButtons: [this.editCollaboratorBn],
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
    this.$nextTick(() => this.updatePageCollaborators());
  }

  @Watch('collaborators')
  @Watch('currentPage')
  @Watch('itemsByPage')
  updatePageCollaborators() {
    const startIndex = (this.currentPage - 1) * this.itemsByPage;
    this.pageCollaborators = (this.collaborators || []).slice(
      startIndex,
      startIndex + this.itemsByPage
    );
    this.itemsCount = (this.collaborators || []).length;
    this.maxPage =
      Math.floor(this.itemsCount / this.itemsByPage) +
      (this.itemsCount % this.itemsByPage > 0 ? 1 : 0);
  }

  goToGithub(item: ListItem) {
    if (item.isCollaborator) openURL(`https://github.com/${item.login}`);
  }

  updateTranslations() {}

  async mounted() {
    this.innerLoading = true;
    await this.registerTranslations(TranslationsKeys);
    this.updateTranslations();
    this.innerLoading = false;
  }
}
