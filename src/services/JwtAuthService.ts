import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { privateKey, publicKey } from '../settings';
import { JwtService, TokenResult } from '@wisegar-org/wgo-opengar-core';

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

const _jwtService = new JwtService({ privateKey: privateKey, publicKey: publicKey })

export const saveJwt = (jwtUser: jwtUser) => {
  const newToken = jwt.sign(jwtUser, privateKey, {
    expiresIn: "7d",
    algorithm: 'RS256'
  });
  return newToken;
};

export const checkJwt = (req: Request, res: Response): unknown => {
  //Get the jwt token from the head
  const token = <string>req.headers["auth-token"];
  if (!token) return undefined;
  //Try to validate the token and get data
  try {
    const result = _jwtService.verifyToken(token) as TokenResult;
    const { username, session } = result;
    if (result.isExpiring) {
      const newToken = saveJwt({ user: username, session });
      res.set("auth-token", newToken);
    }
    return { user: username, session };
  } catch (error) {
    return undefined;
  }
};
