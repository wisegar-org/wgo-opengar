import { ObjectType } from "type-graphql";
import { GenericArrayResponseGQL, GenericResponseGQL } from "./ResponseGQL";
import { RoleGQL } from '../inputs/RoleInputGQL';

@ObjectType()
export class RoleResponseGQL extends GenericResponseGQL(RoleGQL) {}

@ObjectType()
export class RoleListResponseGQL extends GenericArrayResponseGQL(RoleGQL) { }