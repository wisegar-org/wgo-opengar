import { AgvInscriptionResponseModel } from '@wisegar-org/wgo-base-models/build/GraphqlModels';
import { IInscriptionResponseFilter } from '@wisegar-org/wgo-base-models/build/Inscriptions';

function isValidFilter(
  record: AgvInscriptionResponseModel,
  filter: IInscriptionResponseFilter
): boolean {
  return (
    !filter ||
    ((!filter.eventClass || filter.eventClass === record.eventClass) &&
      (!filter.class || filter.class === record.class) &&
      (!filter.eventTitle ||
        (record.eventTitle || '')
          .toLowerCase()
          .indexOf(filter.eventTitle.toLowerCase()) !== -1) &&
      (!filter.email ||
        record.email.toLowerCase().indexOf(filter.email.toLowerCase()) !==
          -1) &&
      (!filter.phone ||
        record.phone.toLowerCase().indexOf(filter.phone.toLowerCase()) !==
          -1) &&
      (!filter.nome ||
        `${record.nome} ${record.cognome}`
          .toLowerCase()
          .indexOf(filter.nome.toLowerCase()) !== -1))
  );
}

export function filterInscriptionsAdmin(
  data: AgvInscriptionResponseModel[],
  filters: IInscriptionResponseFilter
): AgvInscriptionResponseModel[] {
  return data.filter((item) => isValidFilter(item, filters));
}
