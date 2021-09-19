import { ObjectType } from 'type-graphql';
import { EmailGQL } from './EmailInputGQL';
import { GenericResponseGQL } from '../ResponseGQL';

@ObjectType()
export class EmailResponseGQL extends GenericResponseGQL(EmailGQL) {}
