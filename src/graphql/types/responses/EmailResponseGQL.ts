import { ObjectType } from 'type-graphql';
import { EmailGQL } from '../inputs/EmailInputGQL';
import { GenericResponseGQL } from './ResponseGQL';

@ObjectType()
export class EmailResponseGQL extends GenericResponseGQL(EmailGQL) {}
