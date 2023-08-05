import { NextFunction, Request, RequestHandler } from 'express';
import { getEnvVariables } from '@src/envVariables';
import { verify } from 'jsonwebtoken';
import { Result, error, isError, isOk, ok } from '@src/domain/result';
import { STATUS_CODES } from '@src/utils/httpStatusCodes';

export const authorizeUser: RequestHandler = async (
  req: Request,
  res,
  next: NextFunction,
) => {
  const envVars = getEnvVariables();
  const result = await validateAuthToken(
    envVars.jwt.Secret,
    req.headers['authorization'],
  );
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
export const optionallyExtractUsernameFromToken: RequestHandler = async (
  req: Request,
  res,
  next: NextFunction,
) => {
  const envVars = getEnvVariables();
  const result = await validateAuthToken(
    envVars.jwt.Secret,
    req.headers['authorization'],
  );
  if (isOk(result)) {
    res.locals.authorizedUsername = result.value;
    next();
  } else if (isError(result)) {
    // in this case, the endpoint is not protected by authorization
    // so we don't care if the cookie is invalid
    next();
  }
};

export async function validateAuthToken(
  jwtSecret: string,
  header: string | undefined,
): Promise<Result<string>> {
  if (!header) {
    return error({
      message: 'Missing Authorization header',
      code: STATUS_CODES.UNAUTHORIZED,
    });
  }

  const parts = header.split(' ');
  if (!parts || parts.length !== 2) {
    return error({
      message: 'Invalid Authorization header',
      code: STATUS_CODES.UNAUTHORIZED,
    });
  }

  if (!parts[0].startsWith('Bearer')) {
    return error({
      message: 'Invalid Authorization header',
      code: STATUS_CODES.UNAUTHORIZED,
    });
  }

  const token = parts[1];

  return new Promise<Result<string>>((resolve) => {
    verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log('Error while validating JWT', err);
        resolve(
          error({
            code: STATUS_CODES.UNAUTHORIZED,
            message: 'Missing authorization token',
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
          resolve(
            error({
              code: STATUS_CODES.UNAUTHORIZED,
              message: 'Invalid authorization token',
            }),
          );
        }
      }
    });
  });
}
