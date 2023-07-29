import { Box, Heading, Text, Image, HStack, VStack } from '@chakra-ui/react';
import { type Comment } from '../types/article';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input, Button } from '@chakra-ui/react';
import { timeAgo } from '@/utils/timeUtils';
import type { ReactNode } from 'react';

export function Comments({ comments }: { comments: Comment[] }) {
  return (
    <Box mt={4} width="full">
      <Heading as="h3" size="md" mb={2}>
        Comments {comments.length > 0 ? `(${comments.length})` : ''}
      </Heading>
      <JoinDiscussion />
      {comments.map((comment) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
    </Box>
  );
}

type AddCommentData = {
  comment: string;
};

function CommentWrapperWithImage({
  imageSrc,
  children,
}: {
  imageSrc: string;
  children: ReactNode;
}) {
  return (
    <HStack alignItems="start" mb={5}>
      <Image rounded="full" src={imageSrc} boxSize={10} />
      <Box flexGrow={1}>{children}</Box>
    </HStack>
  );
}

function JoinDiscussion() {
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
            {formState.errors.comment && (
              <Text color="red.600">This field is required</Text>
            )}
          </VStack>
          <Button type="submit">Send</Button>
        </HStack>
      </form>
    </CommentWrapperWithImage>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <CommentWrapperWithImage imageSrc="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9">
      <HStack>
        <Text fontWeight="bold">{comment.author}</Text>
        <Text color="gray.500" fontSize="sm">
          {timeAgo(comment.postedAt)}
        </Text>
      </HStack>
      <Text mt={1}>{comment.content}</Text>
    </CommentWrapperWithImage>
  );
}
