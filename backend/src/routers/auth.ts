import { generateAccessToken } from '@src/utils/passwordUtils';
import { Router } from 'express';
import jetValidator from 'jet-validator';
import { sign } from 'jsonwebtoken';
import { isNonEmptyString } from './isNonEmptyString';
import { authenticateUser } from '@src/domain/users';
import { getEnvVariables } from '@src/envVariables';
import { ACCESS_TOKEN_COOKIE_KEY } from '@src/constants';

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
      return res
        .cookie(ACCESS_TOKEN_COOKIE_KEY, token, {
          maxAge: Number(envi.jwt.Exp),
          httpOnly: true,
          secure: envi.nodeEnv === 'production',
          signed: true,
        })
        .status(200)
        .json({ message: 'Logged in successfully' });
    },
  );

  return router;
}
