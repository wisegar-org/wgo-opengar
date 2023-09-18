import { Controller, Get } from "wgo-server";
import { Request, Response } from "express";
import { getDefaultHeader } from "./utils";
import { AGVEventModel } from "../models/Event/EventModel";
import { ctx } from "../../src/handlers/AppContextHandler";

@Controller("/hb")
export class HomeHandlebarsController {
  @Get("/")
  public async GetHomePage(req: Request, res: Response) {
    const defHeader = getDefaultHeader();
    defHeader.headerClass.home = "active";
    const eventModel = new AGVEventModel(ctx);
    const nextEvent = await eventModel.getNexts("");
    const data: { [key: string]: any } = { ...defHeader, title: "Index" };
    if (nextEvent.corso) data.corso = nextEvent.corso;
    if (nextEvent.evento) data.evento = nextEvent.evento;
    res.render("home", data);
  }
}
