import { IssuesRecord } from 'src/modules/finance';
import {
  ExpandableListOptions,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import ExpandableList from '../../../../wgo/components/ExpandableList/ExpandableList.vue';
import IssueDetails from '../IssueDetailsDialog/IssueDetails.vue';

@Component({
  components: {
    ExpandableList,
    IssueDetails
  }
})
export default class IssuesList extends Vue {
  @Prop() loading!: boolean;
  @Prop({ default: '' }) filterStr!: boolean;
  @Prop() issues!: IssuesRecord[];
  @Prop() columns!: PropToEdit[];
  @Prop() headerButtons!: {
    icon: string;
    tooltip: string;
    click: () => unknown;
  }[];

  pageIssues: IssuesRecord[] = [];
  maxPage = 0;
  currentPage = 1;
  itemsByPage = 10;
  itemsCount = 0;

  itemByPageOptions = [5, 10, 20, 50, 100];
  options = <ExpandableListOptions>{
    showAddBotton: false,
    expandedButtons: [],
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
}
