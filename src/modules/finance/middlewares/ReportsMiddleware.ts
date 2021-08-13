import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { getDataOfToken } from '../services/SettingsService';

export const ReportsMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = getDataOfToken(req.query.token.toString()) as {
        billId: number;
        clientId: number;
        nameDoc: string;
      };
      if (!!result.billId && !!result.clientId && !!result.nameDoc && req.url.startsWith(`/${result.nameDoc}`)) {
        next();
        return;
      }
    } catch (error) {
      console.log('Invalid access');
    }
    res.sendStatus(403);
  };
};
