import { Article } from '@src/entities/article';

export const createArticle = async (
  username: string,
  obj: Pick<Article, 'title' | 'perex' | 'content'>,
) => {};
