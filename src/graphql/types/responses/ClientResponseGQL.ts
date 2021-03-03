import { Field, ObjectType } from "type-graphql";
import { BillEntity } from "../../../database/entities/BillEntity";
import { BillInputGQL } from '../inputs/BillInputGQL';
import { GenericArrayResponseGQL, GenericResponseGQL } from "./ResponseGQL";
import { BillGQL } from './BillResponseGQL';

@ObjectType()
export class ClientGQL {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    lastName: string;

    @Field()
    birthDate: Date;

    @Field()
    sex: string;

    @Field()
    civilStatus: string;

    @Field()
    principalAddress: string;

    @Field()
    principalCap: string;

    @Field()
    principalCity: string;

    @Field()
    principalMail: string;

    @Field()
    principalPhone: string;

    @Field()
    secundaryAddress: string;

    @Field()
    secundaryCap: string;

    @Field()
    secundaryCity: string;

    @Field()
    secundaryMail: string;

    @Field()
    secundaryPhone: string;

    @Field(()=>[BillGQL])
    bills: BillEntity[]
}

@ObjectType()
export class ClientResponseGQL extends GenericResponseGQL(ClientGQL) { }

@ObjectType()
export class ClientListResponseGQL extends GenericArrayResponseGQL(ClientGQL) { }