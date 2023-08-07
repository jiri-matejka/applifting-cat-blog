import { generateAccessToken } from '@src/utils/passwordUtils';
import { CookieOptions, Router } from 'express';
import jetValidator from 'jet-validator';
import { sign } from 'jsonwebtoken';
import { isNonEmptyString } from './utils/validationUtils';
import { authenticateUser } from '@src/domain/users';
import { getEnvVariables } from '@src/envVariables';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  IS_AUTHENTICATED_COOKIE_KEY,
} from '@src/constants';
import { STATUS_CODES } from '@src/utils/httpStatusCodes';

export function createAuthRouter(): Router {
  const router = Router();
  const validate = jetValidator();

  router.post(
    '/login',
    validate(['username', isNonEmptyString]),
    validate(['password', isNonEmptyString]),
    async (req, res, next) => {
      if (
        !(await authenticateUser(
          req.body.username as string,
          req.body.password as string,
        ))
      ) {
        res.sendStatus(401);
      } else {
        next();
      }
    },
    (req, res) => {
      const envi = getEnvVariables();
      const token = generateAccessToken(
        envi.jwt.Secret,
        envi.jwt.Exp,
        req.body.username as string,
      );
      return res.status(STATUS_CODES.OK).json({ auth_token: token });
    },
  );

  return router;
}
