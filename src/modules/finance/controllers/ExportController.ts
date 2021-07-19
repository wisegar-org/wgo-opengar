import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol } from '@wisegar-org/wgo-opengar-core';
import { GenerateAccountHTML } from '../services/AccountDetailsToHTML';
import { SendEmail } from '../services/SendEmail';
import { ReadStream } from 'fs-extra';
export const ExportController = (app: Express, conn: Connection) => {
  app.get('/api/exportPdf/:id', AuthorizeUserRol(), async (req, res) => {
    const idAccounting = parseInt(req.params.id);
    GenerateAccountHTML(idAccounting, (doc: ReadStream) => {
      res.setHeader('Content-type', 'application/pdf');
      doc.pipe(res);
    });
  });

  app.post('/api/sendEmail', AuthorizeUserRol(), async (req, res) => {
    const { idAccounting, to, subject, body } = req.body;
    GenerateAccountHTML(idAccounting, (doc: ReadStream) => {
      SendEmail(to, subject, body, doc);
    });
  });
};
