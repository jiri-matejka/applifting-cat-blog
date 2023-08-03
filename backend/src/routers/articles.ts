import { Router } from 'express';

export function createArticlesRouter() {
  const router = Router();

  router.get('/', (req, res) => {
    res.json('Articles list!');
  });

  return router;
}
