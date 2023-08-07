import { NextFunction, Request, Response } from 'express';
import { getEnvVariables } from '@src/envVariables';
import { isError, isOk } from '@src/utils/result';
import { validateAuthToken } from './validateAuthToken';

export async function authorizeUser(
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
    if (result.message) {
      res.statusMessage = result.message;
    }
    res.sendStatus(result.code);
  }
}
