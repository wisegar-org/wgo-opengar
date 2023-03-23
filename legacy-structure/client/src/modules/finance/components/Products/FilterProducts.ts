import { ProductFilter, ProductRecord } from '../../models/models';
import { getProductTypeOptions } from '../../models/parsers';

function isValidFilter(record: ProductRecord, filter: ProductFilter): boolean {
  return (
    !filter ||
    ((!filter.type ||
      !filter.type.value ||
      filter.type.value === record.type) &&
      (!filter.name ||
        record.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1))
  );
}

export function filterProducts(
  data: ProductRecord[],
  filters: ProductFilter
): ProductRecord[] {
  return data.filter(item => isValidFilter(item, filters));
}

export const typeOptions = getProductTypeOptions();
