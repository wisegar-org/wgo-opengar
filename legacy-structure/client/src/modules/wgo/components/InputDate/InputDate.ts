import Field from '../Field';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { QInput, QDate, QPopupProxy, QVueGlobals } from 'quasar';
import VueI18n from 'vue-i18n';
import {
  GetDate,
  GetMaskedDate,
  GetNumbersFromString,
  IsDateAfter,
  IsDateAfterOrEqual,
  IsDateBefore,
  IsDateBeforeOrEqual,
  IsDateValid,
  IsGenericMaskEmpty,
  MASK_DD_MM_YYYY,
  MASK_GENERIC,
  MASK_YYYY_MM_DD,
  IsNullOrUndefined,
  IsStringEmptyNullOrUndefined
} from '@wisegar-org/wgo-opengar-core-ui';
import { InputDateOptions } from '../../models/IInputOptions';
declare module 'vue/types/vue' {
  interface Vue {
    $q: QVueGlobals;
    $t: {
      (
        key: string,
        values?: VueI18n.Values | undefined
      ): VueI18n.TranslateResult;
      (
        key: string,
        locale: string,
        values?: VueI18n.Values | undefined
      ): VueI18n.TranslateResult;
    };
  }
}

@Component({
  components: {
    QInput,
    QDate,
    QPopupProxy
  }
})
export default class InputDate extends Field {
  @Prop() readonly date?: Date;
  @Prop({ default: false }) readonly dense?: boolean;
  @Prop({ default: true }) readonly outlined?: boolean;
  @Prop({ required: true }) options?: InputDateOptions;

  get minDate() {
    return this.options?.minDate;
  }
  get maxDate() {
    return this.options?.maxDate;
  }
  get isSmall() {
    return this.options?.small;
  }
  get onChangeData() {
    return this.options?.onChangeDate;
  }
  get isReadonly() {
    return this.options?.readonly;
  }
  get inputMask() {
    return MASK_GENERIC;
  }
  get qDateMask() {
    return MASK_DD_MM_YYYY;
  }
  get getRules() {
    const rules = [this.requiredField, this.validDate, this.limitDate];
    if (!this.options?.rules || this.options?.rules?.length === 0) return rules;
    return rules.concat(this.options?.rules);
  }
  model: string = '';

  $refs!: {
    input: QInput;
    qDateProxy: QPopupProxy;
  };

  mounted() {
    console.debug('InputDate mounted: ', this.date, this.options);
    this.model = GetMaskedDate(this.date || '', this.qDateMask);
  }

  onSelectionChange() {
    console.debug('InputDate onSelectedDate : ', this.model);
    this.$refs.qDateProxy.hide();
    if (IsGenericMaskEmpty(this.model)) return;
    const numbersCount = GetNumbersFromString(this.model);
    if (numbersCount.length < 8) {
      return false;
    }
    this.$refs.input?.validate();
    const newSelectedDate = GetDate(this.model, this.qDateMask);
    this.onChangeData(newSelectedDate);
  }

  optionsFn(date: any) {
    console.debug('InputDate optionsFn: ', date);
    if (
      IsNullOrUndefined(date) ||
      IsNullOrUndefined(this.minDate) ||
      IsNullOrUndefined(this.maxDate)
    )
      return true;
    const formattedDate = GetMaskedDate(date, MASK_YYYY_MM_DD);
    const formattedMinDate = GetMaskedDate(
      this.minDate,
      MASK_YYYY_MM_DD,
      this.qDateMask
    );
    const formattedMaxDate = GetMaskedDate(
      this.maxDate,
      MASK_YYYY_MM_DD,
      this.qDateMask
    );
    if (this.maxDate && !this.minDate)
      return IsDateBeforeOrEqual(
        formattedDate,
        formattedMaxDate,
        MASK_YYYY_MM_DD
      );
    if (!this.maxDate && this.minDate)
      return IsDateAfterOrEqual(
        formattedDate,
        formattedMinDate,
        MASK_YYYY_MM_DD
      );
    if (this.maxDate && this.minDate)
      return (
        IsDateAfterOrEqual(formattedDate, formattedMinDate, MASK_YYYY_MM_DD) &&
        IsDateBeforeOrEqual(formattedDate, formattedMaxDate, MASK_YYYY_MM_DD)
      );
    return true;
  }

  onFocus(): void {
    console.debug('InputDate onFocus: ', this.model);
    let input = this.$refs.input.$refs.input as HTMLInputElement;
    if (input) input.setSelectionRange(0, 10);
  }

  // TODO: Se non necessario. Cancellare!

  // onBlur(e: Event): void {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.debug('onBlur input: ', this.model);
  //   this.$refs.input?.validate();
  //   if (this.onChangeData) {
  //     if (!IsDateValid(this.model, this.qDateMask)) {
  //       this.onChangeData(null);
  //     } else {
  //       this.onChangeData(GetDate(this.model, this.qDateMask));
  //     }
  //   }
  // }

  requiredField(val: string) {
    console.debug('InputDate requiredField: ', this.obbligatorio);
    return (
      !this.obbligatorio ||
      (!IsGenericMaskEmpty(val) && !IsStringEmptyNullOrUndefined(val)) ||
      'Obbligatorio'
    );
  }

  validDate(val: string) {
    console.debug('InputDate validDate: ', this.model);
    if (IsGenericMaskEmpty(val)) return true;
    return IsDateValid(val, MASK_DD_MM_YYYY) || this.$t('orionDate.wrongDate');
  }

  limitDate(val: string) {
    console.debug('InputDate limitDate: ', val);
    if (
      IsNullOrUndefined(val) ||
      IsNullOrUndefined(this.minDate) ||
      IsNullOrUndefined(this.maxDate)
    )
      return true;
    if (IsGenericMaskEmpty(val)) return true;
    if (!IsDateValid(val)) return false;
    const formattedDate = GetMaskedDate(val, MASK_YYYY_MM_DD, this.qDateMask);
    const formattedMinDate = GetMaskedDate(
      this.minDate,
      MASK_YYYY_MM_DD,
      this.qDateMask
    );
    const formattedMaxDate = GetMaskedDate(
      this.maxDate,
      MASK_YYYY_MM_DD,
      this.qDateMask
    );
    const errorMin = IsDateBefore(
      formattedDate,
      formattedMinDate,
      MASK_YYYY_MM_DD
    );
    const errorMax = IsDateAfter(
      formattedDate,
      formattedMaxDate,
      MASK_YYYY_MM_DD
    );
    let msg = '';
    if (errorMin || errorMax) {
      if (this.maxDate && this.minDate)
        msg = `Data da ${formattedMinDate} a ${formattedMaxDate}`;
      if (this.maxDate && !this.minDate)
        msg = `Data fino a ${formattedMaxDate}`;
      if (!this.maxDate && this.minDate)
        msg = `Data a partire da ${formattedMinDate}`;
    }
    return (!errorMin && !errorMax) || msg;
  }

  @Watch('date')
  onDateChange() {
    this.model = GetMaskedDate(this.date || new Date(), this.qDateMask);
  }

  validate() {
    return (this.$refs.input as any).validate();
  }
}
