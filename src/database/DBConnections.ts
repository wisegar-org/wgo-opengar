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
  //Core Entities
  UserEntity,
  MediaEntity,
  Session,
  RolEntity,

  //Github Entities
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
  name: "development",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "github",
  password: "github",
  database: "github",
  logging: false,
  synchronize: true,
  entities: entities,
};

export const stagingConnection: ConnectionOptions = {
  name: "staging",
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

let productionConnectionVar: ConnectionOptions = {
  name: "production",
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

var connUrl: string | undefined = process.env.DATABASE_URL;

//connUrl = 'postgres://uyvdeckksuenyr:db0dbc4055934e74607e797ebef3119b09ca5bc5e3d660398bf6f55451e1c8a7@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/d59bkv47v3c4kj'

if (connUrl !== undefined) {
  connUrl = connUrl.replace("postgres://", "");
  const pgUserPass = connUrl.split("@")[0];
  const pgHostPortDb = connUrl.split("@")[1];
  const pgHostPort = pgHostPortDb.split("/")[0];
  const pgDb = pgHostPortDb.split("/")[1];
  const pgUser = pgUserPass.split(":")[0];
  const pgPass = pgUserPass.split(":")[1];
  const pgHost = pgHostPort.split(":")[0];
  const pgPort = parseInt(pgHostPort.split(":")[1]);

  productionConnectionVar = {
    name: "staging",
    type: "postgres",
    host: pgHost,
    port: pgPort,
    username: pgUser,
    password: pgPass,
    database: pgDb,
    logging: false,
    synchronize: true,
    ssl: { rejectUnauthorized: false },
    entities: entities,
  };
}

export const productionConnection: ConnectionOptions = productionConnectionVar;
