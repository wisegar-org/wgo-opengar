import { Vue, Component, Prop } from 'vue-property-decorator';
import { ListItem, PropToEdit } from '../models';

@Component({})
export default class ExpandableListFilterLabel extends Vue {
  @Prop({ default: '' }) filterStr!: string;
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
  @Prop({ default: () => ({}) }) filter!: ListItem;
  @Prop({ default: 'and' }) joinText!: string;
  @Prop({ default: () => {} }) cleanFilter!: () => unknown;
  @Prop({ default: () => {} }) openFilter!: () => unknown;

  getFilterLabel() {
    if (this.filterStr) return this.filterStr;
    const filterStr: string[] = [];
    this.propsEditor.forEach(prop => {
      if (prop.prop in this.filter && this.filter[prop.prop]) {
        filterStr.push(`${prop.label} contain <${this.filter[prop.prop]}>`);
      }
    });

    return filterStr.join(` ${this.joinText} `);
  }
}
