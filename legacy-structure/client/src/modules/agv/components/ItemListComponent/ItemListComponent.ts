import { IItem } from '../../models/Item';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ItemComponent from '../ItemComponent/ItemComponent.vue';

@Component({
  components: {
    ItemComponent
  }
})
export default class ItemListComponent extends Vue {
  @Prop() items!: IItem[];
  @Prop() onItemClick!: (item: IItem) => void;
}
