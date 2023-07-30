import { Button } from '@chakra-ui/react';
import { HeadingWithChildren } from '../HeadingWithButton';
import { CreateEditArticle } from './CreateEditArticle';

export function CreateArticlePage() {
  const formId = 'create-article-form';

  return (
    <>
      <HeadingWithChildren headingText="Create article">
        <Button type="submit" form={formId} size="sm" colorScheme="blue" mt={1}>
          Publish
        </Button>
      </HeadingWithChildren>
      <CreateEditArticle mode="create" formId={formId} />
    </>
  );
}
