import { ObjectType } from 'type-graphql';
import { RoleGQL } from './RoleInputGQL';
import { GenericArrayResponseGQL, GenericResponseGQL } from '../ResponseGQL';

@ObjectType()
export class RoleResponseGQL extends GenericResponseGQL(RoleGQL) {}

@ObjectType()
export class RoleListResponseGQL extends GenericArrayResponseGQL(RoleGQL) {}
