import { NextFunction, Request, RequestHandler } from 'express';
import { ACCESS_TOKEN_COOKIE_KEY } from '@src/constants';
import { getEnvVariables } from '@src/envVariables';
import { verify } from 'jsonwebtoken';
import { Result, error, isError, isOk, ok } from '@src/domain/result';
import { STATUS_CODES } from '@src/utils/httpStatusCodes';

export const authorizeUserFromCookie: RequestHandler = async (
  req: Request,
  res,
  next: NextFunction,
) => {
  const cookie = req.signedCookies[ACCESS_TOKEN_COOKIE_KEY];
  const result = await validateAuthCookie(cookie);
  if (isOk(result)) {
    res.locals.authorizedUsername = result.value;
    next();
  } else if (isError(result)) {
    if (result.message) {
      res.statusMessage = result.message;
    }
    res.sendStatus(result.code);
  }
};

/// If access token cookie is present, extract username from it and
/// store it in res.locals.authorizedUsername
/// Otherwise do nothing
export const optionallyExtractUsernameFromCookie: RequestHandler = async (
  req: Request,
  res,
  next: NextFunction,
) => {
  const cookie = req.signedCookies[ACCESS_TOKEN_COOKIE_KEY];
  const result = await validateAuthCookie(cookie);
  if (isOk(result)) {
    res.locals.authorizedUsername = result.value;
    next();
  } else if (isError(result)) {
    // in this case, the endpoint is not protected by authorization
    // so we don't care if the cookie is invalid
    next();
  }
};

export async function validateAuthCookie(
  cookie?: string,
): Promise<Result<string>> {
  const vars = getEnvVariables();

  if (!cookie) {
    return error({
      message: 'Missing authorization cookie',
      code: STATUS_CODES.UNAUTHORIZED,
    });
  }

  return new Promise<Result<string>>((resolve, reject) => {
    verify(cookie, vars.jwt.Secret, (err, decoded) => {
      if (err) {
        console.log('Error while validating JWT', err);
        reject(
          error({
            code: STATUS_CODES.UNAUTHORIZED,
            message: 'Missing authorization cookie',
          }),
        );
      } else {
        if (
          typeof decoded === 'object' &&
          decoded.username &&
          typeof decoded.username === 'string' &&
          decoded.username.length > 0
        ) {
          resolve(ok(decoded.username));
        } else {
          console.log('Decoded payload has invalid format', decoded);
          reject(
            error({
              code: STATUS_CODES.UNAUTHORIZED,
              message: 'Invalid authorization cookie',
            }),
          );
        }
      }
    });
  });
}
