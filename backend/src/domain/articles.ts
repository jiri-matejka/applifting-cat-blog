import { dbDataSource } from '@src/database/dataSource';
import { Article } from '@src/entities/article';
import { User } from '@src/entities/user';
import { Result, error, ok } from './result';
import { STATUS_CODES } from '../utils/httpStatusCodes';

export type ArticleForCreation = Pick<
  Article,
  'title' | 'perex' | 'content' | 'authorUsername'
>;

export const createArticle = async (
  username: string,
  data: Omit<ArticleForCreation, 'authorUsername'>,
) => {
  const userRepo = dbDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ username });
  if (!user) {
    console.log('User not found', username);
    return false;
  }

  const articleRepo = dbDataSource.getRepository(Article);
  const article: ArticleForCreation = {
    authorUsername: username,
    ...data,
  };
  await articleRepo.save(article);

  return true;
};

export const getArticlesWithoutComments = async () => {
  const articleRepo = dbDataSource.getRepository(Article);

  return await articleRepo
    .createQueryBuilder()
    .select('article')
    .from(Article, 'article')
    .innerJoinAndSelect('article.author', 'author')
    .getMany();
};

export const getFullArticle = async (id: string) => {
  const articleRepo = dbDataSource.getRepository(Article);

  return await articleRepo
    .createQueryBuilder()
    .select('article')
    .from(Article, 'article')
    .innerJoinAndSelect('article.author', 'author')
    .leftJoinAndSelect('article.comments', 'comment')
    .where('article.id = :id', { id })
    .getOne();
};

export type ArticleForPatch = Pick<Article, 'title' | 'perex' | 'content'>;

export const patchArticle = async (
  authorizedUsername: string,
  articleId: string,
  data: ArticleForPatch,
): Promise<Result> => {
  const articleRepo = dbDataSource.getRepository(Article);
  const article = await articleRepo.findOneBy({ id: articleId });
  if (!article) {
    return error({
      code: STATUS_CODES.NOT_FOUND,
      message: 'Article not found',
    });
  }
  if (article.authorUsername !== authorizedUsername) {
    return error({
      code: STATUS_CODES.UNAUTHORIZED,
      message: 'You cannot edit article written by someone else',
    });
  }

  const patchedArticle = {
    ...article,
    ...data,
  };

  articleRepo.save(patchedArticle);

  return ok();
};
