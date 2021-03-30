import { ConnectionOptions } from "typeorm";
import {
  UserEntity,
  MediaEntity,
  Session,
  RolEntity,
} from "@wisegar-org/wgo-opengar-core";

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
  username: "opengar",
  password: "opengar",
  database: "opengar-dev",
  logging: false,
  synchronize: true,
  entities: [UserEntity, MediaEntity, Session, RolEntity],
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
  entities: [UserEntity, MediaEntity, Session, RolEntity],
};

export const productionConnection: ConnectionOptions = {
  name: "staging",
  type: "postgres",
  host: "ec2-108-128-104-50.eu-west-1.compute.amazonaws.com",
  port: 5432,
  username: "zpzcjivqrnwrrr",
  password: "d2b59769e642ad04e2cd5f3d29a6da9430989a241ae63305e84712c992e3198d",
  database: "d5ol14rgdbg8sd",
  logging: false,
  synchronize: true,
  entities: [UserEntity, MediaEntity, Session, RolEntity],
};
