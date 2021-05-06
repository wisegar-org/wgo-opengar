import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Response } from "../../models/responseModels/Response";
import { ClientDataService } from "../../services/data-services/ClientDataService";
import {
  ClientListResponseGQL,
  ClientResponseGQL,
} from "../types/responses/ClientResponseGQL";
import {
  ClientFilterArgs,
  ClientInputGQL,
} from "../types/inputs/ClientInputGQL";
import ClientEntity from "../../database/entities/ClientEntity";

@Resolver()
export class ClientResolver {
  private readonly _clientDataService: ClientDataService;

  constructor() {
    this._clientDataService = new ClientDataService();
  }

  @Query(() => ClientListResponseGQL)
  async clients(@Args() criteria?: ClientFilterArgs) {
    return await this._clientDataService.all(criteria);
  }

  @Query(() => ClientResponseGQL)
  async client(@Args() criteria?: ClientFilterArgs) {
    return await this._clientDataService.one(criteria);
  }

  @Query(() => ClientResponseGQL)
  async clientById(@Arg("id") id: number) {
    return await this._clientDataService.oneById(id);
  }

  @Mutation(() => ClientResponseGQL)
  async addClient(
    @Arg("data")
    {
      name,
      lastName,
      sex,
      birthDate,
      civilStatus,
      principalAddress,
      principalCap,
      principalCity,
      principalMail,
      principalPhone,
      secundaryAddress,
      secundaryCap,
      secundaryCity,
      secundaryMail,
      secundaryPhone,
    }: ClientInputGQL
  ): Promise<Response<ClientEntity>> {
    const client = new ClientEntity(
      name,
      lastName,
      birthDate,
      sex,
      civilStatus
    );
    client.setPrincipalInfo(
      principalAddress,
      principalCap,
      principalCity,
      principalMail,
      principalPhone
    );
    client.setSecondaryInfo(
      secundaryAddress,
      secundaryCap,
      secundaryCity,
      secundaryMail,
      secundaryPhone
    );
    return await this._clientDataService.create(client);
  }

  @Mutation(() => ClientResponseGQL)
  async updateClient(
    @Arg("data")
    {
      id,
      name,
      lastName,
      sex,
      birthDate,
      civilStatus,
      principalAddress,
      principalCap,
      principalCity,
      principalMail,
      principalPhone,
      secundaryAddress,
      secundaryCap,
      secundaryCity,
      secundaryMail,
      secundaryPhone,
    }: ClientInputGQL
  ): Promise<Response<ClientEntity>> {
    const clientResponse = await this.clientById(id);
    if (!clientResponse.isSuccess) {
      return clientResponse;
    }
    const client = clientResponse.result;
    client.name = name ? name : client.name;
    client.lastName = lastName ? lastName : client.lastName;
    client.sex = sex ? sex : client.sex;
    client.birthDate = birthDate ? birthDate : client.birthDate;
    client.civilStatus = civilStatus ? civilStatus : client.civilStatus;
    client.principalAddress = principalAddress
      ? principalAddress
      : client.principalAddress;
    client.principalCap = principalCap ? principalCap : client.principalCap;
    client.principalCity = principalCity ? principalCity : client.principalCity;
    client.principalMail = principalMail ? principalMail : client.principalMail;
    client.principalPhone = principalPhone
      ? principalPhone
      : client.principalPhone;
    client.secundaryAddress = secundaryAddress
      ? secundaryAddress
      : client.secundaryAddress;
    client.secundaryCap = secundaryCap ? secundaryCap : client.secundaryCap;
    client.secundaryCity = secundaryCity ? secundaryCity : client.secundaryCity;
    client.secundaryMail = secundaryMail ? secundaryMail : client.secundaryMail;
    client.secundaryPhone = secundaryPhone
      ? secundaryPhone
      : client.secundaryPhone;

    return await this._clientDataService.update(client);
  }

  @Mutation(() => ClientResponseGQL)
  async removeClient(@Arg("id") id: number): Promise<Response<ClientEntity>> {
    return await this._clientDataService.remove(id);
  }
}
