import { RequiredValidationError } from '@/common/ValidationError';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import useAxios from 'axios-hooks';
import type { Article, CreateArticleRequest } from '@/types/article';
import { publicApi } from '@/api/axiosConfig';

type ArticleFormData = {
  title: string;
  perex: string;
  content: string;
};

export function ArticleForm({
  mode,
  formId,
}: {
  mode: 'create' | 'edit';
  formId: string;
}) {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>();

  const onSubmit = (data: ArticleFormData) => {
    publicApi
      .post<CreateArticleRequest>(
        '/articles',
        {
          ...data,
          createdAt: new Date().toISOString(),
          lastUpdatedAt: new Date().toISOString(),
        },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(
        () => {
          toast({
            title: 'Article was created',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        },
        (error) => {
          toast({
            title: 'Error occured while creating article',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
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
