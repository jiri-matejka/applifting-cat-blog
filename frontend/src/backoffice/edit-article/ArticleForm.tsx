import { RequiredValidationError } from '@/common/ValidationError';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import type { Article, CreateArticleRequest } from '@/types/article';
import { publicApi } from '@/api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { getMyArticlesRoute } from '@/routing/routes';
import { useFetchData } from '@/api/useFetchData';
import { ApiFetchedContent } from '@/common/ApiFetchedContent';
import { useEffect } from 'react';

type ArticleFormData = {
  title: string;
  perex: string;
  content: string;
};

export function ArticleForm({
  formId,
  articleId,
}: {
  formId: string;
  articleId?: string;
}) {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    data: existingArticleData,
    isLoading,
    isError,
  } = useFetchData<Article>({
    endpoint: `/articles/${articleId}`,
    isEnabled: !!articleId,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArticleFormData>();

  useEffect(() => {
    reset(existingArticleData);
  }, [existingArticleData]);

  return (
    <ApiFetchedContent
      isLoading={isLoading}
      isError={isError}
      errorText="Error loading article data"
    >
      <Box>
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
          <FormControl marginBottom="4" isRequired>
            <FormLabel>Title</FormLabel>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.title && <RequiredValidationError />}
          </FormControl>

          <FormControl marginBottom="4" isRequired>
            <FormLabel>Perex</FormLabel>
            <Controller
              name="perex"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => <Textarea {...field} />}
            />
            {errors.perex && <RequiredValidationError />}
          </FormControl>

          <FormControl marginBottom="4" isRequired>
            <FormLabel>Content</FormLabel>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => <Textarea {...field} height="20rem" />}
            />
            {errors.content && <RequiredValidationError />}
          </FormControl>
        </form>
      </Box>
    </ApiFetchedContent>
  );

  function onSubmit(data: ArticleFormData) {
    publicApi
      .request<CreateArticleRequest>({
        url: `/articles${articleId ? `/${articleId}` : ''}`,
        method: articleId ? 'PATCH' : 'POST',
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        () => {
          navigate(getMyArticlesRoute());
          toast({
            title: articleId ? 'Article was updated' : 'Article was created',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        },
        (error) => {
          console.error('Error occured', error);
          toast({
            title: `Error occured while ${
              articleId ? 'updating' : 'creating'
            } article`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      );
  }
}
