import { Express } from 'express';
import { Connection } from 'typeorm';
import { AuthorizeUserRol, RolEntityEnum } from '@wisegar-org/wgo-opengar-core';
import { FinanceMediaService } from '../services/FinanceMediaService';
import { UploadedFile } from 'express-fileupload';
export const MediaController = (app: Express, conn: Connection) => {
  app.post('/api/addMedia', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const mediaService = new FinanceMediaService();
    if (req.files && req.files.File) {
      const uploadedFiles = req.files.File instanceof Array ? (req.files.File as UploadedFile[]) : [req.files.File];
      const result = await mediaService.uploadFiles(uploadedFiles);
      res.send({ created: result.length > 0, items: result });
    } else res.send({ created: false });
  });

  app.get('/api/downloadMedia', AuthorizeUserRol([RolEntityEnum.admin]), async (req, res) => {
    const mediaService = new FinanceMediaService();
    const { id } = req.query;
    const result = await mediaService.getFile(parseInt(id as string));
    res.send(result);
  });
};
