import { ArticleTable } from './ArticleTable';
import { HeadingWithChildren } from '../HeadingWithButton';
import { Button, Link } from '@chakra-ui/react';
import { getCreateArticleRoute, getLoginRoute } from '@/routing/routes';
import { Link as ReactRouterLink } from 'react-router-dom';

export function MyArticlesPage() {
  return (
    <>
      <HeadingWithChildren headingText="My articles">
        <Button
          colorScheme="blue"
          as={ReactRouterLink}
          to={getCreateArticleRoute()}
        >
          Create article
        </Button>
      </HeadingWithChildren>
      <ArticleTable />
    </>
  );
}
