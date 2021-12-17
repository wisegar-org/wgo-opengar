import { CollaboratorRecord } from '../..';

export interface IFilterCollaborator {
  name: string;
  email: string;
  type: string;
  url: string;
}

export function FilterCollaborator(
  collaboratos: CollaboratorRecord[],
  filter: IFilterCollaborator
) {
  return collaboratos.filter(coll => {
    return (
      !filter ||
      ((!filter.name ||
        coll.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1) &&
        (!filter.email ||
          coll.email.toLowerCase().indexOf(filter.email.toLowerCase()) !==
            -1) &&
        (!filter.type || coll.type.indexOf(filter.type) !== -1) &&
        (!filter.url ||
          coll.url.toLowerCase().indexOf(filter.url.toLowerCase()) !== -1))
    );
  });
}
