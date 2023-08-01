import { Button } from '@chakra-ui/react';
import { HeadingWithChildren } from '../HeadingWithButton';
import { ArticleForm } from './ArticleForm';

export function EditArticlePage() {
  const formId = 'edit-article-form';

  return (
    <>
      <HeadingWithChildren headingText="Edit article">
        <Button type="submit" form={formId} size="sm" colorScheme="blue" mt={1}>
          Publish
        </Button>
      </HeadingWithChildren>
      <ArticleForm mode="edit" formId={formId} />
    </>
  );
}
