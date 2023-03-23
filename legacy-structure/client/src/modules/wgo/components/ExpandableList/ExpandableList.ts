import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Expanded from '../Expanded/Expanded.vue';
import {
  ListItem,
  PropToEdit,
  DefaultExpandableListOptions,
  ExpandableListOptions
} from './models';
import ExpandableListEditor from './ExpandableListEditor/ExpandableListEditor.vue';
import ExpandableListEditorDialog from './ExpandableListEditor/ExpandableListEditorDialog.vue';
import Loader from '../Loader.vue';
import ExpandableListFilterLabel from './ExpandableListFilter/ExpandableListFilterLabel.vue';
import ExpandableListHeader from './ExpandableListHeader/ExpandableListHeader.vue';
import { Getter } from 'vuex-class';
import {
  componentsGettedKeys,
  componentsNamespace
} from '../../store/ComponentsState';

@Component({
  components: {
    Expanded,
    ExpandableListEditor,
    ExpandableListEditorDialog,
    Loader,
    ExpandableListFilterLabel,
    ExpandableListHeader
  }
})
export default class ExpandableList extends Vue {
  @Prop({ default: '' }) title!: string;
  @Prop({ default: () => [] }) items!: ListItem[];
  @Prop({ default: () => [] }) allItems!: ListItem[];
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
  @Prop({ default: 'info' }) icon!: string;
  @Prop({ default: () => DefaultExpandableListOptions })
  options!: ExpandableListOptions;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: 0 }) minHeight!: number;
  @Prop({ default: false }) bordered!: boolean;
  @Prop({ default: '' }) filterStr!: string;
  @Prop({ default: 4 }) maxLabels!: number;

  @Getter(componentsGettedKeys.getLeftDrawerOpen, {
    namespace: componentsNamespace
  })
  show!: boolean;
  @Getter(componentsGettedKeys.getLeftDrawerMinState, {
    namespace: componentsNamespace
  })
  minState!: boolean;

  filterItems: ListItem[] = this.items;
  openDialog = false;
  selectedItem: ListItem | null = null;
  filter: ListItem = {};

  public cardHeight = 500;
  public listHeight = 300;
  id_button =
    'button-' +
    Math.random()
      .toString(20)
      .substring(2, 10);

  @Watch('filter')
  @Watch('items')
  onFilterChange() {
    this.filterItems = this.options.filterItems
      ? this.options.filterItems(this.items, this.filter)
      : this.items;
    this.resizeCard();
  }
  applyFilter(filter: ListItem) {
    this.filter = { ...filter };
  }

  openFilter() {
    ((this.$refs.filter as any) as {
      onShowDialog: () => unknown;
    }).onShowDialog();
  }

  addItem(item: ListItem | null = null) {
    this.selectedItem = item;
    this.openDialog = true;
  }

  closeDialog() {
    this.openDialog = false;
  }

  deleteItem(item: ListItem, index: number) {
    this.$q
      .dialog({
        title: 'Confirm',
        message: this.options.textDeleteConfirm,
        persistent: true,
        focus: 'cancel',
        ok: {
          color: 'primary',
          label: 'Si',
          tabindex: 0
        },
        cancel: {
          flat: true,
          label: 'No',
          tabindex: 1
        }
      })
      .onOk(async () => {
        await this.options.onDeleteItem(item, index);
      });
  }

  public addResize(onResizeFn: any) {
    window.addEventListener('resize', onResizeFn);
    this.$nextTick(() => {
      onResizeFn();
    });
  }

  public removeResize(onResizeFn: any) {
    window.removeEventListener('resize', onResizeFn);
  }

  @Watch('show', { immediate: false })
  @Watch('minState', { immediate: false })
  @Watch('filterStr', { immediate: false })
  resizeMenu() {
    setTimeout(this.resizeCard, 130);
  }

  public resizeCard(
    defaultBottomPx: number = 0,
    defaultPlaceholderPx: number = 157
  ) {
    const placeholder = this.$refs.placeholder as HTMLElement;
    const filterLabel = this.$refs.filterLabel as HTMLElement;
    const pagination = this.$refs.pagination as HTMLElement;
    if (placeholder) {
      const h =
        placeholder.getBoundingClientRect().bottom || defaultPlaceholderPx;
      this.cardHeight = this.minHeight
        ? this.minHeight
        : window.innerHeight - h - defaultBottomPx;
    } else {
      this.cardHeight = 500;
    }
    const placeholder2 = this.$refs.placeholder2 as HTMLElement;
    const placeholder3 = this.$refs.placeholder3 as HTMLElement;
    if (this.cardHeight === this.minHeight) {
      const h2 = !!this.$q.platform.is.mobile ? 2 : 1;
      const mobileH = placeholder3 ? 0 : 40;
      const filterH = filterLabel.offsetHeight || 0;
      this.listHeight = this.minHeight - 120 - h2 * mobileH - filterH;
    } else if (placeholder2) {
      const h =
        placeholder2.getBoundingClientRect().bottom || defaultPlaceholderPx;
      const filterH = filterLabel.offsetHeight || 0;
      const paginationH = pagination.offsetHeight || 0;
      this.listHeight =
        window.innerHeight - h - paginationH - defaultBottomPx - 20 - filterH;
    } else {
      this.listHeight = 300;
    }
  }

  getLabels(item: ListItem) {
    const result: { label: string; tooltip?: string; columns: number }[] = [];
    this.propsEditor.forEach(prop => {
      if (prop.required || prop.visible) {
        const value = prop.value
          ? prop.value(item)
          : `${(item as any)[prop.prop]}`;
        let tooltip = '';
        const columns = prop.columns || 1;

        if (prop.tooltip) {
          tooltip =
            typeof prop.tooltip === 'string'
              ? prop.tooltip
              : prop.tooltip(item);
        }

        result.push({ label: value, tooltip: tooltip, columns: columns });
      }
    });
    return result;
  }

  toggleFullScreen() {
    const target = this.$refs.viewCard as Vue;
    this.$q.fullscreen.toggle(target.$el as any);
  }

  async mounted() {
    this.addResize(this.onResize);
  }

  async unmounted() {
    this.removeResize(this.onResize);
  }

  onResize() {
    this.resizeCard();
  }
}
