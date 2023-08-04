import { Router } from 'express';
import jetValidator from 'jet-validator';
import { isNonEmptyString, isUuid, sendResultToResponse } from './utils';
import {
  createArticle,
  getArticlesWithoutComments,
  patchArticle,
} from '@src/domain/articles';
import { isError, isOk } from '@src/domain/result';
import { optionallyExtractUsernameFromCookie } from './validateAuthCookie';
import { changeCommentVote, createComment } from '@src/domain/comments';
import { STATUS_CODES } from '@src/utils/httpStatusCodes';
import { send } from 'process';

export function createCommentsRouter() {
  const router = Router();
  const validate = jetValidator();

  router.post(
    '/',
    validate(['text', isNonEmptyString]),
    validate(['articleId', isUuid]),
    optionallyExtractUsernameFromCookie,
    async (req, res) => {
      const result = await createComment({
        text: req.body.text as string,
        articleId: req.body.articleId as string,
        authorUsername: res.locals.authorizedUsername as string,
      });
      sendResultToResponse(result, res, STATUS_CODES.CREATED);
    },
  );

  router.post(
    '/:id/upvote',
    validate(['id', isUuid, 'params']),
    async (req, res) => {
      const result = await changeCommentVote(req.params['id'], '', 1);
      sendResultToResponse(result, res, STATUS_CODES.CREATED);
    },
  );

  router.post(
    '/:id/downvote',
    validate(['id', isUuid, 'params']),
    async (req, res) => {
      const result = await changeCommentVote(req.params['id'], '', -1);
      sendResultToResponse(result, res, STATUS_CODES.CREATED);
    },
  );

  return router;
}
