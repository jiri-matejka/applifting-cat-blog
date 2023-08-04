import type { Article, FullArticle } from '../types/article';

export function getArticles(): FullArticle[] {
  return [
    {
      id: '10',
      content: 'This is some text with **bold**',
      createdAt: new Date(2022, 0, 1),

      author: 'Jiri Matejka',
      // todo_ImageUrl:
      //   'https://i.pinimg.com/originals/7b/c3/17/7bc31709442b6e0eacfd325b0b96429b.jpg',
      lastUpdatedAt: new Date(2022, 3, 1),
      title: 'Very nice article',
      perex: 'Very important',
      comments: [
        {
          articleId: '10',
          author: 'Jirka',
          id: '1',
          text: 'Very good comment',
          postedAt: new Date(2022, 3, 1, 13, 30, 0),
          votes: 10,
        },
      ],
    },
    {
      id: '11',
      content: 'LOREM PISUM',
      createdAt: new Date(2023, 7, 22),

      author: 'Jiri Matejka',
      // todo_ImageUrl:
      //   'https://i.pinimg.com/originals/7b/c3/17/7bc31709442b6e0eacfd325b0b96429b.jpg',
      lastUpdatedAt: new Date(2022, 3, 1),
      title: 'How to feed your cat',
      perex: 'We will show you how to feed your cat',
      comments: [],
    },
  ];
}
