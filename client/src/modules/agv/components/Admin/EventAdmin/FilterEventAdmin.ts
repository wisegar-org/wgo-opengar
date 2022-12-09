import {
  EventEnrollmentOptions,
  EventVisibleOptions,
  IEventResponseFilter,
} from '@wisegar-org/wgo-base-models/build/Events';
import { AgvEventResponseModel } from '@wisegar-org/wgo-base-models/build/GraphqlModels';

function isValidFilter(
  record: AgvEventResponseModel,
  filter: IEventResponseFilter
): boolean {
  return (
    !filter ||
    ((!filter.type || filter.type === record.type) &&
      (!filter.state || filter.state === record.state) &&
      (!filter.class || filter.class === record.class) &&
      (!filter.enrollment ||
        filter.enrollment ===
          (record.enrollment
            ? EventEnrollmentOptions[0]
            : EventEnrollmentOptions[1])) &&
      (!filter.visible ||
        filter.visible ===
          (record.visible ? EventVisibleOptions[0] : EventVisibleOptions[1])) &&
      (!filter.title ||
        record.title.toLowerCase().indexOf(filter.title.toLowerCase()) !== -1))
  );
}

export function filterEventsAdmin(
  data: AgvEventResponseModel[],
  filters: IEventResponseFilter
): AgvEventResponseModel[] {
  return data.filter((item) => isValidFilter(item, filters));
}
