import { Component, Prop, Vue } from 'vue-property-decorator';
import { AgvEventResponseModel } from '../../models/GraphqlModels';

@Component({})
export default class ItemComponent extends Vue {
  @Prop() item!: AgvEventResponseModel;
  @Prop() onItemClick!: (item: AgvEventResponseModel) => void;

  getBasicImage() {
    if (this.item && this.item.imgTitle) return this.item.imgTitle;
    return 'https://cdn.quasar.dev/img/parallax1.jpg';
  }
}
