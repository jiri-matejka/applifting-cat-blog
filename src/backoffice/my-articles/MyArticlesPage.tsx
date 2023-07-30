import { Text, Heading, Button, Flex, Box } from '@chakra-ui/react';
import { ArticleTable } from './ArticleTable';

export function MyArticlesPage() {
  return (
    <>
      <Heading as="h1" pb="4" alignItems="start" display="flex" gap={6}>
        My articles
        <Button size="sm" colorScheme="blue" mt={1}>
          Create new article
        </Button>
      </Heading>
      <ArticleTable />
    </>
  );
}
