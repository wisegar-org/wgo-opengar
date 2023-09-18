import { ObjectType } from "type-graphql";
import { Email } from "./EmailInputs";
import { GenericResponse } from "@wisegar-org/wgo-base-server";

@ObjectType()
export class EmailResponse extends GenericResponse(Email) {}
