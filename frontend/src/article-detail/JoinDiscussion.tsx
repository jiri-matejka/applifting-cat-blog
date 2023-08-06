import { Text, HStack, VStack, useToast } from '@chakra-ui/react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input, Button } from '@chakra-ui/react';
import { CommentWrapperWithImage } from './CommentWrapperWithImage';
import { RequiredValidationError } from '@/common/ValidationError';
import { publicApi } from '@/api/axiosConfig';
import { useAvatarImage } from '@/hooks/useAvatarImage';

export type AddCommentData = {
  text: string;
};

export function JoinDiscussion({ articleId }: { articleId: string }) {
  const { register, handleSubmit, formState, reset } =
    useForm<AddCommentData>();
  const toast = useToast();
  const avatarSrc = useAvatarImage();

  return (
    <CommentWrapperWithImage imageSrc={avatarSrc}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack alignItems="start">
          <VStack flexGrow={1} alignItems="start">
            <Input
              size="md"
              type="text"
              {...register('text', { required: true })}
              placeholder="Add your comment"
            />
            {formState.errors.text && <RequiredValidationError />}
          </VStack>
          <Button type="submit">Send</Button>
        </HStack>
      </form>
    </CommentWrapperWithImage>
  );

  function onSubmit(data: AddCommentData) {
    publicApi
      .post('/comments', {
        articleId,
        ...data,
      })
      .then(() => reset())
      .catch(() => {
        toast({
          title: `Error sending comment`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }
}
