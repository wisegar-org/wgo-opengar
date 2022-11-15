import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AGVInscriptionModel } from "../../models/Inscription/InscriptionModel";
import { IContextBase } from "../../wgo-base/core/models/context";
import { AGVInscriptionInput } from "./AGVInscriptionInputs";
import {
  AGVInscriptionAddResponse,
  AGVInscriptionResponse,
} from "./AGVInscriptionResponses";

@Resolver()
export class AGVInscriptionResolver {
  @Query(() => [AGVInscriptionResponse])
  async agvAllInscriptions(@Ctx() ctx: IContextBase) {
    const inscriptionModel = new AGVInscriptionModel(ctx);
    return await inscriptionModel.all();
  }

  @Mutation(() => AGVInscriptionAddResponse)
  async agvCreateInscription(
    @Arg("data") data: AGVInscriptionInput,
    @Ctx() ctx: IContextBase
  ) {
    const inscriptionModel = new AGVInscriptionModel(ctx);
    return await inscriptionModel.create(data);
  }

  // @Authorized(RolEntityEnum.admin)
  // @Mutation(() => Boolean)
  // async agvModifyInscription(@Arg('data') data: AGVEventInput, @Ctx() ctx: Context) {
  //   const inscriptionModel = new AGVInscriptionModel(this.connection, ctx)
  //   return await this.inscriptionModel.modify(data);
  // }
}
