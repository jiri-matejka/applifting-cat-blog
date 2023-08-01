import { Button } from '@chakra-ui/react';
import { HeadingWithChildren } from '../HeadingWithButton';
import { ArticleForm } from './ArticleForm';
import { AuthenticatedSection } from '@/login/AuthenticatedSection';

export function EditArticlePage() {
  const formId = 'edit-article-form';

  return (
    <AuthenticatedSection>
      <HeadingWithChildren headingText="Edit article">
        <Button type="submit" form={formId} size="sm" colorScheme="blue" mt={1}>
          Publish
        </Button>
      </HeadingWithChildren>
      <ArticleForm mode="edit" formId={formId} />
    </AuthenticatedSection>
  );
}
