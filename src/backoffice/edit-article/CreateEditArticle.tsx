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

  const onSubmit = (data: ArticleFormData) => {
    console.log(data);
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
