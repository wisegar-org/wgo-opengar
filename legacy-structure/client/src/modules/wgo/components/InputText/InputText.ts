import {
  Vue,
  Component,
  Watch,
  Prop,
  Model,
  Emit
} from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { INotify } from '../../models';
import { IInputTextOptions } from '../../models/IInputOptions';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../store/ComponentsState';

const DefaultOptions: IInputTextOptions = {
  small: true,
  readonly: false,
  required: false,
  clearable: true
};

@Component({
  components: {}
})
export default class InputText extends Vue {
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Prop({ default: 'input text' }) label!: string;
  @Prop() onChange!: (value: string) => void;
  @Prop({ default: () => DefaultOptions }) options!: IInputTextOptions;
  @Model() model!: string;
  @Emit('model')
  change() {
    return this.stringValue;
  }
  stringValue = '';

  /**
   *
   */
  constructor() {
    super();
    this.stringValue = this.model ? this.model : '';
  }

  get oInputTextRules() {
    const defaultRules = [this.requiredField];
    return this.options?.rules
      ? defaultRules.concat(this.options?.rules)
      : defaultRules;
  }
  get oInputTextRef() {
    return 'oinputtextref';
  }
  get inputRef(): HTMLInputElement {
    return this.$refs[this.oInputTextRef] as HTMLInputElement;
  }
  get clearOption() {
    return 'clearable' in this.options ? !!this.options?.clearable : true;
  }

  @Watch('model')
  onChangeValue() {
    this.stringValue = this.model;
  }

  requiredField(val: string) {
    if (!this.options?.required) {
      return true;
    } else {
      return !!val || 'campo obbligatorio';
    }
  }
  onFocus(): void {
    if (this.inputRef) this.inputRef.select();
  }

  @Watch('stringValue')
  onStringValueChange() {
    this.change();
    if (this.onChange) this.onChange(this.stringValue);
  }

  validate() {
    return (this.inputRef as any).validate();
  }
  onClear() {
    if (!this.clearOption) return;
    this.stringValue = '';
  }
}
