import { Article } from '@src/entities/article';
import { User } from '@src/entities/user';
import { DataSource } from 'typeorm';
import { Comment } from '@src/entities/comment';
import { CommentVote } from '@src/entities/commentVote';
import { CommentSubscriber } from './commentSubscriber';
import { EnvVariables } from '@src/envVariables';

export let dbDataSource = new DataSource({ type: 'postgres' });

export async function initializeDataSource(envVariables: EnvVariables) {
  console.log(envVariables);
  dbDataSource = new DataSource({
    type: 'postgres',
    ...envVariables.postgres,
    entities: [Article, User, Comment, CommentVote],
    logging: true,
    logger: 'simple-console',
    synchronize: true,
    subscribers: [CommentSubscriber],
  });

  await dbDataSource.initialize();
}
