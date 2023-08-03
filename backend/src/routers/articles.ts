import { Router } from 'express';
import jetValidator from 'jet-validator';
import { isNonEmptyString } from './isNonEmptyString';
import { validateAuthCookie as verifyAndParseAuthCookie } from './validateAuthCookie';
import { createArticle } from '@src/domain/articles';

export function createArticlesRouter() {
  const router = Router();
  const validate = jetValidator();

  router.get('/', (req, res) => {
    res.json('Articles list!');
  });

  router.post(
    '/',
    validate(['title', isNonEmptyString]),
    validate(['perex', isNonEmptyString]),
    validate(['content', isNonEmptyString]),
    verifyAndParseAuthCookie,
    async (req, res) => {
      await createArticle(res.locals.authorizedUsername as string, {
        title: req.body.title as string,
        perex: req.body.perex as string,
        content: req.body.content as string,
      });
      res.sendStatus(201);
    },
  );

  return router;
}
