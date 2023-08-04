import { dbDataSource } from '@src/database/dataSource';
import { User } from '@src/entities/user';
import { doesPasswordMatchHash } from '@src/utils/passwordUtils';

export async function authenticateUser(
  username: string,
  password: string,
): Promise<boolean> {
  const user = await getUser(username);
  if (!user) {
    return false;
  }

  return await doesPasswordMatchHash(password, user.passwordHash);
}

export async function getUser(username: string): Promise<User | null> {
  const userRepo = dbDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ username });
  return user;
}
