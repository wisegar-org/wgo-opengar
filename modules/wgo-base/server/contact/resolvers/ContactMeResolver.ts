import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { IContactModel } from "../../../models/contact";
import { IContextBase } from "../../../models/core/context";
import { ContactMeModel } from "../models/ContactMeModel";
import { ContactMeInput } from "./ContactMeInputs";
import { ContactMeResponse } from "./ContactMeResponses";

@Resolver()
export class ContactMeResolver {
  @Query(() => ContactMeResponse)
  async getContactData(@Ctx() ctx: IContextBase) {
    const contactModel = new ContactMeModel(ctx);
    const result = await contactModel.getContactData();
    return result;
  }

  @Mutation(() => Boolean)
  async setContactData(
    @Arg("data") data: ContactMeInput,
    @Ctx() ctx: IContextBase
  ) {
    const contactModel = new ContactMeModel(ctx);
    const result = await contactModel.setContactData(data as IContactModel);
    return result;
  }
}
