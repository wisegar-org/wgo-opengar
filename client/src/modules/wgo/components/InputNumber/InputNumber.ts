import {
  Prop,
  Model,
  Emit,
  Watch,
  Component,
  Vue
} from 'vue-property-decorator';
import { IInputNumberOptions } from '../../models/IInputOptions';

const DefaultOptions: IInputNumberOptions = {
  small: true,
  readonly: false,
  required: false,
  decimal: 0,
  clearable: true
};

@Component({
  components: {}
})
export default class InputNumber extends Vue {
  @Prop({ default: () => DefaultOptions }) options!: IInputNumberOptions;
  @Prop({ default: '' })
  protected readonly label!: string;
  @Prop({ default: false })
  protected readonly?: boolean;
  private stringValue = '';

  @Model('change', { type: Number }) value!: number;
  @Emit('change')
  changed() {
    return parseFloat(this.stringValue) || 0;
  }
  @Watch('value')
  onChangeValue(value: number) {
    if (value != parseFloat(this.stringValue)) {
      this.stringValue = value ? value.toFixed(this.options.decimal) : '';
    }
  }
  get oInputNumberRules() {
    const defaultRules = [this.requiredField];
    return this.options?.rules
      ? defaultRules.concat(this.options?.rules)
      : defaultRules;
  }
  get oInputNumberRef() {
    return 'oinputnumberref';
  }
  get inputRef(): HTMLInputElement {
    return this.$refs[this.oInputNumberRef] as HTMLInputElement;
  }
  get readonlyOption() {
    return this.options?.readonly ? this.options?.readonly : false;
  }
  get denseOption() {
    return this.options?.small ? this.options?.small : true;
  }
  get clearOption() {
    return 'clearable' in this.options ? !!this.options?.clearable : true;
  }
  constructor() {
    super();
  }

  mounted() {
    this.onChangeValue(this.value);
  }
  requiredField(val: string) {
    let _valido = false;
    this.changed();

    if (!this.options.required) {
      _valido = true;
    } else {
      if (!val || val == '' || parseFloat(val) == 0) {
        _valido = false;
      } else {
        _valido = true;
      }
    }
    return _valido || 'Obbligatorio';
  }

  onInput(val: string) {
    const validNumber = new RegExp(/^\d*\.?\d*$/);
    if (validNumber.test(val)) {
      this.changed();
    } else {
      this.stringValue = this.inputRef.value;
    }
  }

  onClear() {
    if (!this.clearOption) return;
    this.stringValue = '';
  }
  onBlur() {
    const wNum = parseFloat(this.stringValue);
    if (isNaN(wNum) || wNum == 0) {
      this.stringValue = '';
    } else if (this.stringValue != wNum.toFixed(this.options.decimal)) {
      this.stringValue = wNum.toFixed(this.options.decimal);
    }
    console.log('ONumber - onBlur POST:', this.stringValue);
    this.changed();
    this.$emit('blur');
  }

  async onFocus() {
    let input = this.$refs.input as HTMLInputElement;
    if (input) await input.select();
  }

  validate() {
    return (this.inputRef as any).validate();
  }
}
