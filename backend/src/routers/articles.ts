import { Router } from 'express';
import jetValidator from 'jet-validator';
import { isNonEmptyString } from './isNonEmptyString';
import { validateAuthCookie as verifyAndParseAuthCookie } from './validateAuthCookie';
import { createArticle, getArticles } from '@src/domain/articles';

export function createArticlesRouter() {
  const router = Router();
  const validate = jetValidator();

  router.get('/', async (req, res) => {
    res.json(
      (await getArticles()).map((domainArticle) => ({
        id: domainArticle.id,
        title: domainArticle.title,
        perex: domainArticle.perex,
        content: domainArticle.content,
        author: domainArticle.author.name,
      })),
    );
  });

  router.post(
    '/',
    validate(['title', isNonEmptyString]),
    validate(['perex', isNonEmptyString]),
    validate(['content', isNonEmptyString]),
    verifyAndParseAuthCookie,
    async (req, res) => {
      const created = await createArticle(
        res.locals.authorizedUsername as string,
        {
          title: req.body.title as string,
          perex: req.body.perex as string,
          content: req.body.content as string,
        },
      );
      res.sendStatus(created ? 201 : 400);
    },
  );

  return router;
}
