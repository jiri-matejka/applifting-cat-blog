import { Text, HStack, VStack, useToast } from '@chakra-ui/react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input, Button } from '@chakra-ui/react';
import { CommentWrapperWithImage } from './CommentWrapperWithImage';
import { RequiredValidationError } from '@/common/ValidationError';
import { publicApi } from '@/api/axiosConfig';

export type AddCommentData = {
  text: string;
};

export function JoinDiscussion({ articleId }: { articleId: string }) {
  const { register, handleSubmit, formState, reset } =
    useForm<AddCommentData>();
  const toast = useToast();

  return (
    <CommentWrapperWithImage imageSrc="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9">
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
