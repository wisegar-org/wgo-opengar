import { AccountRecord } from '../..';

export interface IFilterAccounting {
  accountedTo: string;
}

export function FilterAccountings(
  records: AccountRecord[],
  filters: IFilterAccounting
) {
  return records;
}
