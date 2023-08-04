import { generateAccessToken } from '../utils/passwordUtils';
// eslint-disable-next-line node/no-extraneous-import
import { expect, test } from '@jest/globals';
import { validateAuthCookie } from './validateAuthCookie';
import { isError, isOk } from '@src/domain/result';

test('should accept signed token', async () => {
  const tokenSecret = 'token-secret';
  const franta = 'franta';

  const accessToken = generateAccessToken(tokenSecret, '1000', franta);

  const result = await validateAuthCookie(tokenSecret, accessToken);

  expect(isOk(result)).toBe(true);
  expect(isOk(result) && result.value).toBe(franta);
});

test('should refuse wrong token', async () => {
  const tokenSecret = 'token-secret';
  const franta = 'franta';

  const wrongToken = generateAccessToken('anotherSecret', '1000', franta);

  const result = await validateAuthCookie(tokenSecret, wrongToken);

  expect(isError(result)).toBe(true);
});
