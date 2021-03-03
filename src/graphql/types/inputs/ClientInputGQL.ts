import { ArgsType, Field, ID, InputType, Int } from "type-graphql";


@InputType()
export class ClientInputGQL {
    @Field(() => ID, { nullable: true })
    id?: number
    @Field()
    name: string;
    @Field()
    lastName: string;
    @Field({nullable:true})
    birthDate: Date;
    @Field({ nullable: true })
    sex: string;
    @Field({ nullable: true })
    civilStatus: string;
    @Field({ nullable: true })
    principalAddress: string;
    @Field({ nullable: true })
    principalCap: string;
    @Field({ nullable: true })
    principalCity: string;
    @Field({ nullable: true })
    principalMail: string;
    @Field({ nullable: true })
    principalPhone: string;
    @Field({ nullable: true })
    secundaryAddress: string;
    @Field({ nullable: true })
    secundaryCap: string;
    @Field({ nullable: true })
    secundaryCity: string;
    @Field({ nullable: true })
    secundaryMail: string;
    @Field({ nullable: true })
    secundaryPhone: string;
}



@ArgsType()
export class ClientFilterArgs {
    @Field(() => Int, { nullable: true })
    id?: number;

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    lastName?: string;

    @Field(() => String, { nullable: true })
    sex: string;

    //Se pudieran añadir mas campos
}