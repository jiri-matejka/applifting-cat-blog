import { Router } from 'express';
import jetValidator from 'jet-validator';
import { isNonEmptyString, isUuid } from './utils';
import { authorizeUserFromCookie } from './validateAuthCookie';
import {
  createArticle,
  getFullArticle,
  getArticlesWithoutComments,
  patchArticle,
} from '@src/domain/articles';
import { isError, isOk } from '@src/domain/result';
import { STATUS_CODES } from '@src/utils/httpStatusCodes';

export function createArticlesRouter() {
  const router = Router();
  const validate = jetValidator();

  router.get('/', async (req, res) => {
    res.json(
      (await getArticlesWithoutComments()).map((domainArticle) => ({
        id: domainArticle.id,
        title: domainArticle.title,
        perex: domainArticle.perex,
        content: domainArticle.content,
        author: domainArticle.author.name,
      })),
    );
  });

  router.get('/:id', validate(['id', isUuid, 'params']), async (req, res) => {
    const domainArticle = await getFullArticle(req.params['id']);

    if (!domainArticle) {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
      return;
    }

    res.json({
      id: domainArticle.id,
      title: domainArticle.title,
      perex: domainArticle.perex,
      content: domainArticle.content,
      author: domainArticle.author.name,
      comments: domainArticle.comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        author: comment.author?.name,
      })),
    });
  });

  router.post(
    '/',
    validate(['title', isNonEmptyString]),
    validate(['perex', isNonEmptyString]),
    validate(['content', isNonEmptyString]),
    authorizeUserFromCookie,
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

  router.patch(
    '/:id',
    validate(['id', isUuid, 'params']),
    // for simplicity, I require all fields to be present
    validate(['title', isNonEmptyString]),
    validate(['perex', isNonEmptyString]),
    validate(['content', isNonEmptyString]),
    authorizeUserFromCookie,
    async (req, res) => {
      const result = await patchArticle(
        res.locals.authorizedUsername as string,
        req.params.id,
        {
          title: req.body.title as string,
          perex: req.body.perex as string,
          content: req.body.content as string,
        },
      );
      if (isOk(result)) {
        res.sendStatus(204);
      } else if (isError(result)) {
        res.status(result.code).json(result.message);
      }
    },
  );

  return router;
}
