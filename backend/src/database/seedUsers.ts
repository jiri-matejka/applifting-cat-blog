import { User } from '@src/entities/user';
import { hashPassword } from '@src/utils/passwordUtils';
import { dbDataSource } from './dataSource';

export async function seedUsers() {
  const repo = dbDataSource.getRepository(User);

  if (!(await repo.exist({ where: { username: 'jirka' } }))) {
    const jirka = new User();
    jirka.username = 'jirka';
    jirka.name = 'Jiri Matejka';
    jirka.passwordHash = await hashPassword('jirka');
    repo.insert(jirka);
  }

  if (!(await repo.exist({ where: { username: 'franta' } }))) {
    const franta = new User();
    franta.username = 'franta';
    franta.name = 'Franta';
    franta.passwordHash = await hashPassword('franta');

    await repo.insert([franta]);
  }
}
