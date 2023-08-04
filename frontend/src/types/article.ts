export type Comment = {
  articleId: string;
  author: string;
  text: string;
  id: string;
  postedAt: Date;
  votes: number;
};

export type Article = {
  id: string;
  title: string;
  perex: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  author: string;
};

export type FullArticle = Article & {
  comments: Comment[];
  content: string;
};

export type CreateArticleRequest = Omit<
  Article,
  'articleId' | 'imageId' | 'comments' | 'createdAt' | 'lastUpdatedAt'
> & {
  createdAt: string;
  lastUpdatedAt: string;
};

export type ArticleDetailResponse = Omit<
  FullArticle,
  'createdAt' | 'lastUpdatedAt'
> & {
  createdAt: string;
  lastUpdatedAt: string;
};
