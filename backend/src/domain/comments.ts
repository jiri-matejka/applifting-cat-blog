import { dbDataSource } from '@src/database/dataSource';
import { Result, error, isError, ok } from './result';
import { getUser } from './users';
import { getArticle as getArticle } from './articles';
import { STATUS_CODES, statusCodeType } from '@src/utils/httpStatusCodes';
import { Comment } from '@src/entities/comment';
import { CommentVote } from '@src/entities/commentVote';

export async function createComment({
  text,
  articleId,
  authorUsername,
}: {
  text: string;
  articleId: string;
  authorUsername?: string;
}): Promise<Result<statusCodeType>> {
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
  voteDelta: 1 | -1,
) {
  return await dbDataSource.transaction(async (manager) => {
    async function handleExistingVotes(): Promise<Result<statusCodeType>> {
      // check if this IP already voted
      const existingVote = await manager.findOneBy(CommentVote, {
        commentId,
        ipAddress,
      });
      if (existingVote && existingVote.vote === voteDelta) {
        // repeated vote in the same direction is prohibited
        return error({
          code: STATUS_CODES.BAD_REQUEST,
          message: 'Already voted',
        });
      } else if (existingVote) {
        // voting with the opossite for the second time (e.g. first up, second down)
        // it means that user is withdrawing his vote
        await manager.delete(CommentVote, existingVote);
        // here the status code are not expressive enough,
        // a custom codes should be included in the body, but let's keep it for now
        return ok(STATUS_CODES.OK);
      } else {
        // first vote
        await manager.insert(CommentVote, {
          commentId,
          ipAddress,
          vote: voteDelta,
        });
        return ok(STATUS_CODES.CREATED);
      }
    }

    const resultFromExistingVotes = await handleExistingVotes();

    if (isError(resultFromExistingVotes)) {
      return resultFromExistingVotes;
    }

    const updateResult = await manager
      .createQueryBuilder()
      .from(Comment, 'comment')
      .setParameter('delta', voteDelta)
      .update({ votes: () => 'votes + :delta' })
      .where('id = :id', { id: commentId })
      .execute();

    return updateResult.affected === 1
      ? ok(resultFromExistingVotes.value)
      : error({ code: STATUS_CODES.NOT_FOUND });
  });
}
