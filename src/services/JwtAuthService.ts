import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { privateKey, publicKey } from '../config/tokenCert';
import {ITokenCheckResult, CheckJwt } from 'quickweb-admin-lib';

export interface jwtUser {
  user: string;
  session: string;
}

declare global {
  namespace Express {
    interface Request {
      user: jwtUser;
    }
  }
}

export const saveJwt = (jwtUser: jwtUser) => {
  const newToken = jwt.sign(jwtUser, privateKey, {
    expiresIn: "7d",
    algorithm: 'RS256'
  });
  return newToken;
};

const checkJwtLib = new CheckJwt(publicKey);

export const checkJwt = (req: Request, res: Response): unknown => {
  //Get the jwt token from the head
  const token = <string>req.headers["auth-token"];
  if (!token) return undefined;
  //Try to validate the token and get data
  try {
    const result = checkJwtLib.checkJwt(token) as ITokenCheckResult;
    const { user, session } = result;
    if (result.expiring) {
      const newToken = saveJwt({ user, session });
      res.set("auth-token", newToken);
    }
    return { user, session };
  } catch (error) {
    return undefined;
  }
};
