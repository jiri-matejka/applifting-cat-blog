import { dbDataSource } from '@src/database/dataSource';
import { User } from '@src/entities/user';
import { doesPasswordMatchHash } from '@src/utils/passwordUtils';

export async function authenticateUser(
  username: string,
  password: string,
): Promise<boolean> {
  const userRepo = dbDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ username });
  if (!user) {
    return false;
  }

  return await doesPasswordMatchHash(password, user.passwordHash);
}
