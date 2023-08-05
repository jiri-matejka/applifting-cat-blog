import { Box, Flex, Heading, Text, Image, Link } from '@chakra-ui/react';
import { type Article } from '../types/article';
import { Link as ReactRouterLink } from 'react-router-dom';
import { getArticleDetailRoute } from '@/routing/routes';

type ArticleItemProps = Pick<Article, 'id' | 'title' | 'perex' | 'author'>;

export function ArticleListItem({
  id: articleId,
  perex,
  title,
  author,
}: ArticleItemProps) {
  return (
    <Link
      as={ReactRouterLink}
      to={getArticleDetailRoute(articleId)}
      _hover={{ textDecor: 'none' }}
    >
      <Box>
        <Heading as="h3" size="md" mb={2}>
          {title}
        </Heading>
        <Text>{perex}</Text>
        <Text mt={2} fontSize="sm" color="gray.500">
          by {author}
        </Text>
      </Box>
    </Link>
  );
}
