import { Button } from '@chakra-ui/react';
import { HeadingWithChildren } from '../HeadingWithButton';
import { ArticleForm } from './ArticleForm';
import { AuthenticatedSection } from '@/login/AuthenticatedSection';

export default function CreateArticlePage() {
  const formId = 'create-article-form';

  return (
    <AuthenticatedSection>
      <HeadingWithChildren headingText="Create article">
        <Button type="submit" form={formId} size="sm" colorScheme="blue" mt={1}>
          Publish
        </Button>
      </HeadingWithChildren>
      <ArticleForm formId={formId} />
    </AuthenticatedSection>
  );
}
