export type Comment = {
  articleId: string;
  author: string;
  content: string;
  commentId: string;
  postedAt: Date;
  votes: number;
};

export type Article = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: Date;
  lastUpdatedAt: Date;
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
