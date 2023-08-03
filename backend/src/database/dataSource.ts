import { Article } from '@src/entities/article';
import { DataSource } from 'typeorm';

export const dbDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Article],
  logging: true,
  logger: 'simple-console',
  synchronize: true,
});

export async function initializeDataSource() {
  await dbDataSource.initialize();
}
