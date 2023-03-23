import { Controller, Get } from '@wisegar-org/wgo-server';
import { Request, Response } from 'express';
import PDFService from '../services/PDFService';
import { readEmails } from '../services/Pop3Service';

@Controller('/api')
export class EmailController {
  @Get('/email')
  public async GetLastMessages(req: Request, res: Response) {
    const numb = await readEmails();

    res.status(200).json(numb + ' emails readed!');
  }

  @Get('/pdf')
  public async GetPDFInfo(req: Request, res: Response) {
    await PDFService.editPDFFromFile('prueba.pdf');

    res.status(200).json('pdf parsed!');
  }
}
