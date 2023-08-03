import { Article } from '@src/entities/article';
import { User } from '@src/entities/user';
import { DataSource } from 'typeorm';

export const dbDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Article, User],
  logging: true,
  logger: 'simple-console',
  synchronize: true,
});

export async function initializeDataSource() {
  await dbDataSource.initialize();
}
