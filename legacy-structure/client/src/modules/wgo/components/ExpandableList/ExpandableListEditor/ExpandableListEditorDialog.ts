import { Vue, Component, Prop } from 'vue-property-decorator';
import Dialog from '../../Dialog/Dialog.vue';
import { ListItem, PropToEdit } from '../models';
import ExpandableListEditor from './ExpandableListEditor.vue';

@Component({
  components: {
    Dialog,
    ExpandableListEditor
  }
})
export default class ExpandableListEditorDialog extends Vue {
  @Prop({ default: false }) open!: boolean;
  @Prop() title!: string;
  @Prop() icon!: string;
  @Prop() styleDialog!: string;
  @Prop({ default: () => {} }) close!: () => unknown;
  @Prop() item!: ListItem;
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
  @Prop({ default: () => {} }) onSaveItem!: (item: ListItem) => unknown;
}
