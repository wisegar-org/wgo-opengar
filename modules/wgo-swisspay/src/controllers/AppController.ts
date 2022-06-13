import { IsNullOrUndefined } from "@wisegar-org/wgo-object-extensions";
import { Controller, Get, Post } from "@wisegar-org/wgo-server";
import { Request, Response } from "express";
import { AddEmailRecord } from "../services/DummyService";

@Controller("/api")
export class AppController {
  @Get("/version")
  public GetVersion(req: Request, res: Response) {
    res.status(200).json("{version: 'v0.0.1'}");
  }

  // @Post("/email")
  // public async PostEmail(req: Request, res: Response) {
  //   const email = await AddEmailRecord();
  //   if (IsNullOrUndefined(email)) res.status(400).end();
  //   else res.status(200).json(email).end();
  // }
}
