import { Article } from '@src/entities/article';
import { User } from '@src/entities/user';
import { DataSource } from 'typeorm';
import { Comment } from '@src/entities/comment';
import { CommentVote } from '@src/entities/commentVote';
import { CommentSubscriber } from './commentSubscriber';
import { EnvVariables } from '@src/envVariables';

export let dbDataSource = new DataSource({ type: 'postgres' });

export async function initializeDataSource(envVariables: EnvVariables) {
  dbDataSource = new DataSource({
    type: 'postgres',
    ...envVariables.postgres,
    entities: [Article, User, Comment, CommentVote],
    logging: true,
    logger: 'simple-console',
    synchronize: true,
    subscribers: [CommentSubscriber],
  });

  await initializeWithRetry();
}

async function initializeWithRetry() {
  try {
    await dbDataSource.initialize();
  } catch (err) {
    if (err?.code === 'ECONNREFUSED' /* || err?.code === 'ENOTFOUND'*/) {
      console.error(
        `Could not connect to database. Retrying in 3s...`,
        err?.code,
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await initializeWithRetry();
    } else {
      throw err;
    }
  }
}
