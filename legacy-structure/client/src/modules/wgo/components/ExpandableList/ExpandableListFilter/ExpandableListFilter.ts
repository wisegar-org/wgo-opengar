import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { ListItem, PropToEdit } from '../models';
import InputDate from '../../InputDate/InputDate.vue';
import InputText from '../../InputText/InputText.vue';
import InputNumber from '../../InputNumber/InputNumber.vue';
import InputSelect from '../../InputSelect/InputSelect.vue';

@Component({
  components: {
    InputDate,
    InputText,
    InputNumber,
    InputSelect
  }
})
export default class ExpandableListFilter extends Vue {
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
  @Prop({ default: () => {} }) applyFilter!: (filter: ListItem) => unknown;
  @Prop({ default: () => {} }) close!: () => unknown;
  @Prop() filter!: ListItem;
  filterEdit: ListItem;
  id_item =
    'upload-button-' +
    Math.random()
      .toString(20)
      .substring(2, 10);

  constructor() {
    super();
    this.filterEdit = this.filter ? { ...this.filter } : {};
  }

  @Watch('filter')
  onModelChange() {
    this.filterEdit = this.filter ? { ...this.filter } : {};
  }

  onApplyFilter() {
    if (this.applyFilter) this.applyFilter(this.filterEdit);
    if (this.close) this.close();
  }

  onResetFilter() {
    this.filterEdit = {};
  }
}
