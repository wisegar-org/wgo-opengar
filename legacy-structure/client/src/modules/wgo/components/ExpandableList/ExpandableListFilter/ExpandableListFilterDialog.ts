import { Vue, Component, Prop } from 'vue-property-decorator';
import { ListItem, PropToEdit } from '../models';
import ExpandableListFilter from './ExpandableListFilter.vue';
import Dialog from '../../Dialog/Dialog.vue';

@Component({
  components: {
    ExpandableListFilter,
    Dialog
  }
})
export default class ExpandableListFilterDialog extends Vue {
  @Prop({ default: false }) open!: boolean;
  @Prop() title!: string;
  @Prop() icon!: string;
  @Prop() filter!: ListItem;
  @Prop({ default: () => {} }) close!: () => unknown;
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
  @Prop({ default: () => {} }) applyFilter!: (filter: ListItem) => unknown;
}
