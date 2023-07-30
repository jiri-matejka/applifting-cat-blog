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
  todo_ImageUrl: string;
  author: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  content: string;
  comments: Comment[];
};

export type CreateArticleRequest = Omit<
  Article,
  'articleId' | 'imageId' | 'comments' | 'todo_ImageUrl' | 'author'
>;
