import { Router } from 'express';
import jetValidator from 'jet-validator';
import { isNonEmptyString, isUuid } from './utils';
import {
  createArticle,
  getArticlesWithoutComments,
  patchArticle,
} from '@src/domain/articles';
import { isError, isOk } from '@src/domain/result';
import { optionallyExtractUsernameFromCookie } from './validateAuthCookie';
import { createComment } from '@src/domain/comments';

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
      if (isError(result)) {
        if (result.message) res.statusMessage = result.message;
        res.sendStatus(result.code);
        return;
      } else if (isOk(result)) {
        res.json(result.value);
        return;
      }
    },
  );

  return router;
}
