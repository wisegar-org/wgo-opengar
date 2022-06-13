import { Controller, Get } from "@wisegar-org/wgo-server";
import { Request, Response } from "express";
import { Pop3Service } from "../services/Pop3Service";
import {
  GetEmailHostKey,
  GetEmailPortKey,
  GetEmailSenderKey,
  GetEmailSenderPassKey

} from "@wisegar-org/wgo-settings";

@Controller("/api")
export class EmailController {
  @Get("/email")
  public async GetLastMessages(req: Request, res: Response) {

    // Get host, port, username, password from request
    const host = GetEmailHostKey(); // EMAIL_HOST
    const port = GetEmailPortKey(); // EMAIL_PORT
    const username = GetEmailSenderKey(); // EMAIL_SENDER_ADDRESS
    const password = GetEmailSenderPassKey(); // EMAIL_SENDER_PASSWORD

    const pop3 = new Pop3Service({
      host: host,
      port: port,
      user: username,
      password: password,
      tls: true,
    });
    
    const numb = await pop3.readAllEmails()

    res.status(200).json(numb + " emails readed!");
  }
}
