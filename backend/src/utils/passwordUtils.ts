import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

const SALT_ROUNDS = 12;

export async function hashPassword(pwd: string): Promise<string> {
  return bcrypt.hash(pwd, SALT_ROUNDS);
}

export function hashPasswordSync(pwd: string): string {
  return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

export async function doesPasswordMatchHash(
  pwd: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}

export function generateAccessToken(
  tokenSecret: string,
  expires: string,
  username: string,
) {
  return sign(
    // // This needs to be an object otherwise expiresIn is not working
    // https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
    { username },
    tokenSecret,
    { expiresIn: expires },
  );
}
