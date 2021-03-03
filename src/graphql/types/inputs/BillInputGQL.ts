import { Field, ID, InputType } from "type-graphql";
import ClientEntity from "../../../database/entities/ClientEntity";
import ProductEntity from "../../../database/entities/ProductEntity";
import { ClientGQL } from "../responses/ClientResponseGQL";

@InputType()
export class BillInputGQL {
    @Field(() => ID, { nullable: true })
    id: number;

    @Field()
    billNumber: number;

    @Field()
    date: Date;

    @Field()
    lensDescription: string;

    @Field()
    lensPrice: number;

    @Field()
    frameDescription: string;

    @Field()
    framePrice: number;

    @Field()
    serviceDescription: string;

    @Field()
    servicePrice: number;

    @Field()
    offer: number;

    @Field()
    total: number;

    @Field()
    payment: number;

    @Field()
    balance: number;

    @Field()
    observation: string;

    @Field(()=>ClientGQL)
     client: ClientEntity;

    // @Field(()=>[ProductInputGQL])
    // products: ProductEntity[];
}