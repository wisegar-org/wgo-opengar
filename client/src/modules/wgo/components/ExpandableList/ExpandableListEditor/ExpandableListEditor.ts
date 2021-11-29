import { Vue, Component, Prop } from 'vue-property-decorator';
import { ListItem, PropToEdit } from '../models';
import InputDate from '../../InputDate/InputDate.vue';
import InputText from '../../InputText/InputText.vue';
import InputNumber from '../../InputNumber/InputNumber.vue';
import { QForm, QInput } from 'quasar';
import {
  GetMaskedDate,
  MASK_YYYY_MM_DD_HH_mm_ss,
  MASK_DD_MM_YYYY
} from '@wisegar-org/wgo-opengar-core-ui';
import { InputDateOptions } from '../../../models/IInputOptions';

@Component({
  components: {
    InputDate,
    InputText,
    InputNumber
  }
})
export default class ExpandableListEditor extends Vue {
  @Prop() item!: ListItem;
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
  @Prop({ default: () => {} }) onSaveItem!: (item: ListItem) => unknown;
  @Prop({ default: () => {} }) close!: () => unknown;
  @Prop({ default: false }) showClose!: boolean;

  itemForm: ListItem = {};

  constructor() {
    super();
    this.itemForm = this.item ? { ...this.item } : {};
  }

  id_item =
    'upload-button-' +
    Math.random()
      .toString(20)
      .substring(2, 10);

  async onSave() {
    const form = this.$refs.oAdminEditor as QForm;
    const count = form.$children.length;
    let index = 0;
    while (
      index < count &&
      'validate' in (form.$children[index] as QInput) &&
      (form.$children[index] as QInput).validate()
    ) {
      index += 1;
    }
    if (await form.validate()) {
      this.onSaveItem(this.itemForm);
    }
  }

  setDateValue(date: Date, obj: ListItem, prop: string) {
    obj[prop] = date.toISOString();
  }

  getDateOptions(options: InputDateOptions, obj: ListItem, prop: string) {
    const setDateValue = this.setDateValue;
    const inputOptions = {
      onChangeDate: (date: Date) => setDateValue(date, obj, prop)
    };
    return options ? { ...options, ...inputOptions } : inputOptions;
  }

  getDateValue(date: string) {
    const dateObj = new Date(date).toISOString();
    const maskDate = GetMaskedDate(
      dateObj,
      MASK_DD_MM_YYYY,
      MASK_YYYY_MM_DD_HH_mm_ss
    );
    return maskDate;
  }
}
