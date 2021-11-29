import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  DefaultExpandableListOptions,
  ExpandableListOptions,
  ListItem,
  PropToEdit
} from '../models';
import ExpandableListExportClipboardButton from '../ExpandableListButtons/ExpandableListExportClipboardButton.vue';
import ExpandableListExportCSVButton from '../ExpandableListButtons/ExpandableListExportCSVButton.vue';
import ExpandableListExportExcelButton from '../ExpandableListButtons/ExpandableListExportExcelButton.vue';
import ExpandableListFilterButton from '../ExpandableListButtons/ExpandableListFilterButton.vue';
import ExpandableListSelectColumnsButtton from '../ExpandableListButtons/ExpandableListSelectColumnsButtton.vue';

@Component({
  components: {
    ExpandableListExportClipboardButton,
    ExpandableListExportCSVButton,
    ExpandableListExportExcelButton,
    ExpandableListFilterButton,
    ExpandableListSelectColumnsButtton
  }
})
export default class ExpandableListHeader extends Vue {
  @Prop({ default: '' }) title!: string;
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
  @Prop({ default: () => DefaultExpandableListOptions })
  options!: ExpandableListOptions;
  @Prop({ default: () => [] }) items!: ListItem[];
  @Prop({ default: () => {} }) filter!: ListItem;
  @Prop({ default: () => ({}) }) toggleFullScreen!: () => unknown;
  @Prop({ default: (item: ListItem | null) => ({}) }) addItem!: (
    item: ListItem | null
  ) => unknown;
  @Prop({ default: (filter: ListItem) => ({}) }) applyFilter!: (
    filter: ListItem
  ) => unknown;
  @Prop({ default: () => ({}) }) closeDialog!: () => unknown;
  id_button =
    'button-header-' +
    Math.random()
      .toString(20)
      .substring(2, 10);
}
