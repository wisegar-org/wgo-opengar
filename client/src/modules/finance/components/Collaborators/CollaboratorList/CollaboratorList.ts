import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import ViewAccountingCollaborator from '../EditCollaborator/ViewAccountingCollaborator.vue';
import { CollaboratorRecord } from 'src/modules/finance';
import { Action, Getter } from 'vuex-class';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { TranslationsKeys } from '../TranslationsKeys';
import {
  WGOExpandableButton,
  WGOExpandableListOptions,
  WGOListItem,
  WGOPropToEdit
} from '@wisegar-org/quasar-app-extension-wgo-vue-components/src/lib';
import {
  componentsGettedKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';

@Component({
  components: {
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
  @Prop() columns!: WGOPropToEdit[];
  @Prop() headerButtons!: {
    icon: string;
    tooltip: string;
    click: () => unknown;
  }[];
  @Prop() editCollaborator!: (coll: CollaboratorRecord) => unknown;
  @Getter(componentsGettedKeys.getLeftDrawerOpen, {
    namespace: componentsNamespace
  })
  show!: boolean;
  @Getter(componentsGettedKeys.getLeftDrawerMinState, {
    namespace: componentsNamespace
  })
  minState!: boolean;

  watchProps = {
    show: false,
    minState: false
  };

  pageCollaborators: CollaboratorRecord[] = [];
  innerLoading = false;
  maxPage = 0;
  currentPage = 1;
  itemsByPage = 10;
  itemsCount = 0;

  editCollaboratorBn: WGOExpandableButton = {
    click: (item?: WGOListItem) =>
      this.editCollaborator((item as any) as CollaboratorRecord),
    icon: 'edit',
    tooltip: 'Edit'
  };

  itemByPageOptions = [5, 10, 20, 50, 100];
  options = <WGOExpandableListOptions>{
    showAddButton: false,
    expandedButtons: [this.editCollaboratorBn],
    labelShowAddButton: '',
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

  @Watch('translationContent')
  updateTranslations() {
    this.editCollaboratorBn.tooltip = this.translationContent.WGO_FINANCE_COLLABORATOR_EDIT_CONTACT_BTN;
  }

  @Watch('show')
  @Watch('minState')
  changeWatchProps() {
    this.watchProps = {
      show: this.show,
      minState: this.minState
    };
  }

  async mounted() {
    this.innerLoading = true;
    await this.registerTranslations(TranslationsKeys);
    this.updateTranslations();
    this.innerLoading = false;
  }
}
