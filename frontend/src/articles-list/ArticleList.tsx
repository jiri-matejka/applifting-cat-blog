import { Heading, VStack } from '@chakra-ui/react';
import { ArticleListItem } from './ArticleListItem';
import type { Article } from '@/types/article';
import type { paginationResult } from '@/types/paginationResult';
import { useFetchData } from '../api/useFetchData';
import { ApiFetchedContent } from '../common/ApiFetchedContent';

export function ArticleList() {
  const { data, isLoading, isError } = useFetchData<paginationResult<Article>>({
    endpoint: '/articles',
  });

  return (
    <>
      <Heading as="h1" pb="4">
        Recent articles
      </Heading>

      <ApiFetchedContent
        isLoading={isLoading}
        isError={isError}
        errorText="There was an error loading articles."
      >
        <VStack spacing={4} alignItems="start" pt="4">
          {data?.items?.length === 0
            ? 'No articles written yet'
            : data?.items.map((article) => (
                <ArticleListItem key={article.articleId} {...article} />
              ))}
        </VStack>
      </ApiFetchedContent>
    </>
  );
}
