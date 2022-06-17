import { Controller, Get } from '@wisegar-org/wgo-server';
import { Request, Response } from 'express';
import { readEmails } from '../services/Pop3Service';

@Controller('/api')
export class EmailController {
  @Get('/email')
  public async GetLastMessages(req: Request, res: Response) {
    const numb = await readEmails();

    res.status(200).json(numb + ' emails readed!');
  }
}
