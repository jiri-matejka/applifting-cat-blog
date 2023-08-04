import { dbDataSource } from '@src/database/dataSource';
import { Result, error, ok } from './result';
import { getUser } from './users';
import { getArticle as getArticle } from './articles';
import { STATUS_CODES } from '@src/utils/httpStatusCodes';
import { Comment } from '@src/entities/comment';

export async function createComment({
  text,
  articleId,
  authorUsername,
}: {
  text: string;
  articleId: string;
  authorUsername?: string;
}): Promise<Result> {
  const commentRepo = dbDataSource.getRepository(Comment);

  // the comments can be posted by anonymous users
  const author = authorUsername
    ? (await getUser(authorUsername)) ?? undefined
    : undefined;
  const article = await getArticle(articleId);

  if (!article) {
    return error({
      code: STATUS_CODES.NOT_FOUND,
      message: 'Article not found',
    });
  }

  await commentRepo.insert({
    text,
    article,
    author,
  });

  return ok();
}

export async function changeCommentVote(
  commentId: string,
  ipAddress: string,
  voteDelta: number,
) {
  const commentRepo = dbDataSource.getRepository(Comment);

  // check if this IP already voted

  const updateResult = await commentRepo
    .createQueryBuilder()
    .from(Comment, 'comment')
    .setParameter('delta', voteDelta)
    .update({ votes: () => 'votes + :delta' })
    .where('id = :id', { id: commentId })
    .execute();

  return updateResult.affected === 1
    ? ok()
    : error({ code: STATUS_CODES.NOT_FOUND });
}
