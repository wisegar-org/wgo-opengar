import { BillFilter, BillRecord } from '../../models/models';

function isValidFilter(record: BillRecord, filter: BillFilter): boolean {
  return (
    !filter ||
    ((!filter.client ||
      record.client.name.toLowerCase().indexOf(filter.client.toLowerCase()) !==
        -1) &&
      (!filter.status || record.status === filter.status.value))
  );
}

export function filterBills(
  data: BillRecord[],
  filters: BillFilter
): BillRecord[] {
  return data.filter(item => isValidFilter(item, filters));
}
