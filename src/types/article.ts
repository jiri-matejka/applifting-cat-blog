export type Comment = {
  articleId: string;
  author: string;
  content: string;
  commentId: string;
  postedAt: Date;
  score: number;
};

export type Article = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  todo_ImageUrl: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  content: string;
  comments: Comment[];
};
