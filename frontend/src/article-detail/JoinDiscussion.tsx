import { Text, HStack, VStack } from '@chakra-ui/react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input, Button } from '@chakra-ui/react';
import { CommentWrapperWithImage } from './CommentWrapperWithImage';
import { RequiredValidationError } from '@/common/ValidationError';

export type AddCommentData = {
  comment: string;
};

export function JoinDiscussion() {
  const { register, handleSubmit, formState } = useForm<AddCommentData>();

  const onSubmit: SubmitHandler<AddCommentData> = (data) => console.log(data);

  return (
    <CommentWrapperWithImage imageSrc="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack alignItems="start">
          <VStack flexGrow={1} alignItems="start">
            <Input
              size="md"
              type="text"
              {...register('comment', { required: true })}
              placeholder="Add your comment"
            />
            {formState.errors.comment && <RequiredValidationError />}
          </VStack>
          <Button type="submit">Send</Button>
        </HStack>
      </form>
    </CommentWrapperWithImage>
  );
}
