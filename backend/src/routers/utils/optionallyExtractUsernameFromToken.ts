import { NextFunction, Request, Response } from 'express';
import { getEnvVariables } from '@src/envVariables';
import { isError, isOk } from '@src/domain/result';
import { validateAuthToken } from './validateAuthToken';

/// If access token cookie is present, extract username from it and
/// store it in res.locals.authorizedUsername
/// Otherwise do nothing

export async function optionallyExtractUsernameFromToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
}
