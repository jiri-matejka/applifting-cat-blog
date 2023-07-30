import { RequiredValidationError } from '@/utils/ValidationError';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import useAxios from 'axios-hooks';
import type { Article, CreateArticleRequest } from '@/types/article';

type ArticleFormData = {
  title: string;
  perex: string;
  content: string;
};

export function CreateEditArticle({
  mode,
  formId,
}: {
  mode: 'create' | 'edit';
  formId: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>();

  const [{ data, loading, error }, executePost] = useAxios<
    unknown,
    CreateArticleRequest
  >(
    {
      url: '/articles',
      method: 'POST',
      headers: {
        'X-API-KEY': '6398f131-36e5-4ed8-be62-c46cb6feedef',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 723da993-2e4b-48e4-9eb2-c37620ada461',
      },
    },
    { manual: true, useCache: false },
  );

  const onSubmit = (data: ArticleFormData) => {
    executePost({
      data: {
        ...data,
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
      },
    }).then(
      (value) => {
        console.log('SUCCESS', value);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  return (
    <Box>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <FormControl marginBottom="4" isRequired>
          <FormLabel>Title</FormLabel>
          <Controller
            name="title"
            control={control}
            defaultValue=""
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
  );
}
