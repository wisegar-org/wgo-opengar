import { AccountRecord } from '../..';
import {
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING
} from './TranslationsKeys';

export interface IFilterAccounting {
  name: string;
  status: string;
}

export function statusValidFilter(record: AccountRecord, status: string) {
  if (!status) return true;
  switch (status) {
    case WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING: {
      return record.status === 1;
    }
    case WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED: {
      return record.status === 2;
    }
    case WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED: {
      return record.status === 3;
    }
    default: {
      return true;
    }
  }
}

export function nameValidFilter(record: AccountRecord, name: string) {
  debugger;
  if (!name || !record.contributor) return true;
  return (
    record.contributor.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
    record.contributor.login.toLowerCase().indexOf(name.toLowerCase()) !== -1
  );
}

export function FilterAccountings(
  records: AccountRecord[],
  filters: IFilterAccounting
) {
  debugger;
  const result = records.filter(
    item =>
      !filters ||
      (nameValidFilter(item, filters.name) &&
        statusValidFilter(item, filters.status))
  );
  return result;
}
