import { Heading, VStack, Text } from '@chakra-ui/react';
import { ArticleListItem } from './ArticleListItem';
import type { Article } from '@/types/article';
import { useFetchData } from '../api/useFetchData';
import { ApiFetchedContent } from '../common/ApiFetchedContent';

export function ArticleList() {
  const { data, isLoading, isError } = useFetchData<Article[]>({
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
          {data?.length === 0 ? (
            <Text>No articles written yet</Text>
          ) : (
            data?.map((article) => (
              <ArticleListItem key={article.id} {...article} />
            ))
          )}
        </VStack>
      </ApiFetchedContent>
    </>
  );
}
