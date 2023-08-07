import { verify } from 'jsonwebtoken';
import { Result, error, ok } from '@src/utils/result';
import { STATUS_CODES } from '@src/utils/httpStatusCodes';

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
