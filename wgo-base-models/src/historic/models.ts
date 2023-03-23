export enum Actions {
  SoftDelete = "SoftDelete",
  Delete = "Delete",
  Add = "Add",
  Update = "Update",
  Restore = "Restore",
  Access = "Access",
  Unknown = "Unknown",
}

export interface IHistoricPageFilterInput {
  entity?: string;
  action?: string;
  username?: string;
}

export interface IHistoricPageInput {
  skip: number;
  take: number;
  descending: boolean;
  sortBy: string;
  filter?: IHistoricPageFilterInput;
}

export interface IHistoricResponse {
  action: string;
  entity: string;
  creatoIl: Date;
  id: number;
  message: string;
  modificatoIl: Date;
  userId: number;
  username: string;
  snapshot: string;
}

export interface IAllHistoricResponse {
  histories: IHistoricResponse[];
}

export interface IHistoricPageResponse {
  histories: IHistoricResponse[];
  count: number;
}

export interface IHistoricFiltersResponse {
  entities: string[];
  actions: string[];
  usernames: string[];
}
