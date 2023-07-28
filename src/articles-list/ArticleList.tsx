import type { Article } from '../types/article';
import { Heading, VStack } from '@chakra-ui/react';
import { ArticleListItem } from './ArticleListItem';

export function ArticleList() {
  return (
    <>
      <Heading as="h1" pb="4">
        Recent articles
      </Heading>

      <VStack spacing={4} alignItems="start" pt="4">
        {getArticles().map((article) => (
          <ArticleListItem
            key={article.articleId}
            {...article}
            commentsCount={article.comments.length}
          />
        ))}
      </VStack>
    </>
  );
}

function getArticles(): Article[] {
  return [
    {
      articleId: '10',
      content: 'this is very big content',
      createdAt: new Date(2022, 0, 1),
      imageId: '1',
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
          score: 10,
        },
      ],
    },
  ];
}
