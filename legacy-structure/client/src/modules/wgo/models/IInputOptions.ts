export interface IInputTextOptions {
  onChange?: any;
  small?: boolean;
  readonly?: boolean;
  rules?: any[];
  required?: boolean;
  clearable?: boolean;
}
// TODO: Ereditare
export interface IInputNumberOptions extends IInputTextOptions {
  decimal?: number;
}

export interface InputDateOptions {
  onChangeDate?: any;
  minDate?: string;
  maxDate?: string;
  small?: boolean;
  readonly?: boolean;
  rules?: any[];
}

export interface IInputSelectableOptions {
  label: string;
  value: any;
}
