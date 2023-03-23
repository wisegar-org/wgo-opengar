import { FrequencyRepeatEnum } from '@wisegar-org/wgo-opengar-core-ui';

export const getStatusPayedString = (status: number) => {
  switch (status) {
    case 1:
      return 'To be payed';
    case 2:
      return 'Payed';
    default:
      return 'To be payed';
  }
};

export const getFrequencyString = (
  repeat: number | FrequencyRepeatEnum
): string => {
  switch (repeat) {
    case FrequencyRepeatEnum.Never:
      return 'Never';
    case FrequencyRepeatEnum.Monthly:
      return 'Monthly';
    case FrequencyRepeatEnum.Annually:
      return 'Annually';
    default:
      return 'Never';
  }
};

export const getFrequencyOptions = () => {
  const keys: { label: string; value: number }[] = [];
  for (const key in FrequencyRepeatEnum) {
    const value = parseInt(key);
    if (!isNaN(value)) {
      keys.push({
        label: getFrequencyString(value),
        value: value
      });
    }
  }
  return keys;
};

export const TransactionTypeOptions = () => {
  return [
    { label: 'Bill', value: 'Bill' },
    { label: 'Expense', value: 'Expense' },
    { label: 'Income', value: 'Income' }
  ];
};

export const getProductTypeString = (type: number) => {
  switch (type) {
    case 1:
      return 'Product';
    case 2:
      return 'Service';
    default:
      return 'Product';
  }
};

export const getProductTypeOptions = () => {
  return [
    { label: 'Product', value: 1 },
    { label: 'Service', value: 2 }
  ];
};

export const getBillStatusString = (type: number) => {
  switch (type) {
    case 1:
      return 'Pending';
    case 2:
      return 'Sent';
    case 3:
      return 'Payed';
    case 4:
      return 'Cancelled';
    default:
      return 'Pending';
  }
};

export const getBillStatusOptions = () => {
  return [
    { label: 'Pending', value: 1 },
    { label: 'Sent', value: 2 },
    { label: 'Payed', value: 3 },
    { label: 'Cancelled', value: 4 }
  ];
};
