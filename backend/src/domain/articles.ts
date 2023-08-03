import { dbDataSource } from '@src/database/dataSource';
import { Article, ArticleForCreation } from '@src/entities/article';
import { User } from '@src/entities/user';

export const createArticle = async (
  username: string,
  obj: Omit<ArticleForCreation, 'authorUsername'>,
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
    ...obj,
  };
  await articleRepo.save(article);

  return true;
};

export const getArticles = async () => {
  const articleRepo = dbDataSource.getRepository(Article);

  return await articleRepo
    .createQueryBuilder()
    .select('article')
    .from(Article, 'article')
    .innerJoinAndSelect('article.author', 'author')
    .getMany();
};
