import { ArticleTable } from './ArticleTable';
import { HeadingWithChildren } from '../HeadingWithButton';
import { Button } from '@chakra-ui/react';
import { getCreateArticleRoute } from '@/routing/routes';
import { Link as ReactRouterLink } from 'react-router-dom';
import { AuthenticatedSection } from '@/login/AuthenticatedSection';

export default function MyArticlesPage() {
  return (
    <AuthenticatedSection>
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
    </AuthenticatedSection>
  );
}
