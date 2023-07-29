import type { Article } from '../types/article';

export function getArticles(): Article[] {
  return [
    {
      articleId: '10',
      content: 'this is very big content',
      createdAt: new Date(2022, 0, 1),
      imageId: '1',
      author: 'Jiri Matejka',
      todo_ImageUrl:
        'https://i.pinimg.com/originals/7b/c3/17/7bc31709442b6e0eacfd325b0b96429b.jpg',
      lastUpdatedAt: new Date(2022, 3, 1),
      title: 'Very nice article',
      perex: 'Very important',
      comments: [
        {
          articleId: '10',
          author: 'Jirka',
          commentId: '1',
          content: 'Very good comment',
          postedAt: new Date(2022, 3, 1, 13, 30, 0),
          votes: 10,
        },
      ],
    },
  ];
}
