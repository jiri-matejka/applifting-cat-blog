import { Box, Flex, Heading, Text, Image, Link } from '@chakra-ui/react';
import { type Article } from '../types/article';
import { Link as ReactRouterLink } from 'react-router-dom';
import { getArticleDetailRoute } from '@/routing/routes';

type ArticleItemProps = Pick<
  Article,
  'articleId' | 'todo_ImageUrl' | 'title' | 'perex' | 'lastUpdatedAt'
> & {
  commentsCount: number;
};

export function ArticleListItem({
  articleId,
  perex,
  title,
  todo_ImageUrl,
  lastUpdatedAt,
  commentsCount,
}: ArticleItemProps) {
  return (
    <Link
      as={ReactRouterLink}
      to={getArticleDetailRoute(articleId)}
      _hover={{ textDecor: 'none' }}
    >
      <Flex>
        <Image src={todo_ImageUrl} alt={title} boxSize="100px" mr={4} />
        <Box>
          <Heading as="h3" size="md" mb={2}>
            {title}
          </Heading>
          <Text>{perex}</Text>
        </Box>
      </Flex>
    </Link>
  );
}
