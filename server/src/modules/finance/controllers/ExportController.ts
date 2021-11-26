import { Express } from 'express';
import { Connection } from 'typeorm';
import {
  AuthorizeUserRol,
  EmailServer,
  EmailOptions,
  GetEmailAppAddressKey,
  GetEmailAppAddressNameKey,
} from '@wisegar-org/wgo-opengar-core';
import { GenerateAccountHTML } from '../services/AccountDetailsToHTML';
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
      const emailServer = new EmailServer();
      emailServer
        .send(<EmailOptions>{
          to: to,
          from: `${GetEmailAppAddressNameKey()} <${GetEmailAppAddressKey()}>`,
          subject: subject,
          html: body,
          attachments: [
            {
              // utf-8 string as an attachment
              filename: 'invoice.pdf',
              content: doc,
            },
          ],
        })
        .then((result) => {
          console.log('Message sent: %s', result.message);
        });
    });
  });
};
