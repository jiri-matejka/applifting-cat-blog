import { Heading, VStack } from '@chakra-ui/react';
import { ArticleListItem } from './ArticleListItem';
import { getArticles } from './getArticles';

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
