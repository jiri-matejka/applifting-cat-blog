import { Button } from '@chakra-ui/react';
import { HeadingWithChildren } from '../HeadingWithButton';
import { ArticleForm } from './ArticleForm';
import { AuthenticatedSection } from '@/login/AuthenticatedSection';
import { useParams } from 'react-router-dom';

export default function EditArticlePage() {
  const formId = 'edit-article-form';
  const { articleId } = useParams();

  return (
    <AuthenticatedSection>
      <HeadingWithChildren headingText="Edit article">
        <Button type="submit" form={formId} size="sm" colorScheme="blue" mt={1}>
          Publish
        </Button>
      </HeadingWithChildren>
      <ArticleForm formId={formId} articleId={articleId} />
    </AuthenticatedSection>
  );
}
