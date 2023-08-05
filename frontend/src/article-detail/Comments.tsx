import { Box, Heading } from '@chakra-ui/react';
import { type Comment as CommentType } from '../types/article';
import { JoinDiscussion } from './JoinDiscussion';
import { Comment } from './Comment';

export function Comments({
  comments,
  articleId,
}: {
  comments: CommentType[];
  articleId: string;
}) {
  return (
    <Box mt={4} width="full">
      <Heading as="h3" size="md" mb={2}>
        Comments {comments.length > 0 ? `(${comments.length})` : ''}
      </Heading>
      <JoinDiscussion articleId={articleId} />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} articleId={articleId} />
      ))}
    </Box>
  );
}
