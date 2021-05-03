import { ConnectionOptions } from "typeorm";
import {
  UserEntity,
  MediaEntity,
  Session,
  RolEntity,
} from "@wisegar-org/wgo-opengar-core";

import {
  AccountEntity,
  CollaboratorEntity,
  ExpenseEntity,
  IssueEntity,
  LabelEntity,
  MilestoneEntity,
  OrganizationDataEntity,
  ProjectEntity,
  RepositoryEntity,
  TransactionEntity,
} from "@wisegar-org/wgo-github";

const entities = [
  UserEntity,
  MediaEntity,
  Session,
  RolEntity,
  AccountEntity,
  CollaboratorEntity,
  ExpenseEntity,
  IssueEntity,
  LabelEntity,
  MilestoneEntity,
  OrganizationDataEntity,
  ProjectEntity,
  RepositoryEntity,
  TransactionEntity,
];

export enum OGConnection {
  Development = 0,
  Staging = 1,
  Production = 2,
  Environment = 3,
}

export const developmentConnection: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "opengar",
  password: "opengar",
  database: "opengar-dev",
  logging: false,
  synchronize: true,
  entities: entities,
};

export const stagingConnection: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "opengar",
  password: "opengar",
  database: "opengar-stg",
  logging: false,
  synchronize: true,
  entities: entities,
};

export const productionConnection: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "opengar",
  password: "opengar",
  database: "opengar",
  logging: false,
  synchronize: true,
  entities: entities,
};
