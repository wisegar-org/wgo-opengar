import { Request, Response } from "express";
import { Controller, Get } from "@wisegar-org/wgo-base-server";

@Controller("/api")
export class AppVersionsController {
  @Get("/version")
  public GetVersion(req: Request, res: Response) {
    res.status(200).json("{version: 'v0.0.0'}");
  }
}
