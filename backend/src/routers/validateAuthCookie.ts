import { NextFunction, Request, RequestHandler } from 'express';
import { ACCESS_TOKEN_COOKIE_KEY } from '@src/constants';
import { getEnvVariables } from '@src/envVariables';
import { verify } from 'jsonwebtoken';

export const validateAuthCookie: RequestHandler = (
  req: Request,
  res,
  next: NextFunction,
) => {
  const vars = getEnvVariables();
  const cookie = req.signedCookies[ACCESS_TOKEN_COOKIE_KEY];
  if (!cookie) {
    res.statusMessage = 'Missing authorization cookie';
    res.sendStatus(401);
  }

  verify(cookie, vars.jwt.Secret, (err, decoded) => {
    if (err) {
      console.log('Error while validating JWT', err);
      res.sendStatus(401);
    } else {
      if (
        typeof decoded === 'object' &&
        decoded.username &&
        typeof decoded.username === 'string' &&
        decoded.username.length > 0
      ) {
        res.locals.authorizedUsername = decoded.username;
        next();
      } else {
        console.log('Decoded payload has invalid format', decoded);
        res.sendStatus(401);
      }
    }
  });
};
