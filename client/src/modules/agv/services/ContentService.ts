import { AgvEventResponseModel } from '../models/GraphqlModels';
import { ITemType } from '../models/Item';

export class ItemService {
  public searchEvents(
    search: string,
    filterClass: string,
    events: AgvEventResponseModel[]
  ) {
    if (search === '' && filterClass === '') return events;
    const itemsList = events;

    return itemsList.filter(item => {
      return (
        (!search ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())) &&
        (!filterClass || item.class === filterClass)
      );
    });
  }

  public compareStrDate(date1?: Date, date2?: Date): number {
    if (!date1) return -1;
    if (!date2) return 1;
    const dateTemp1 = date1
      .toString()
      .split('/')
      .reverse()
      .join('/');
    const dateTemp2 = date2
      .toString()
      .split('/')
      .reverse()
      .join('/');
    return new Date(dateTemp1) >= new Date(dateTemp2) ? 1 : -1;
  }

  public static removeTags(str: string) {
    return !str ? '' : str.replace(/(<([^>]+)>)/gi, '');
  }
}
