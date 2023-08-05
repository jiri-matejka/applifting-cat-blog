import { Text, HStack, Button, useToast } from '@chakra-ui/react';
import { type Comment as CommentType } from '../types/article';
import { timeAgo } from '@/utils/timeUtils';
import { CommentWrapperWithImage } from './CommentWrapperWithImage';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { publicApi } from '@/api/axiosConfig';

const alwaysDisplaySignFormatter = new Intl.NumberFormat(undefined, {
  signDisplay: 'always',
});

export function Comment({
  comment,
  articleId,
}: {
  comment: CommentType;
  articleId: string;
}) {
  return (
    <CommentWrapperWithImage imageSrc="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9">
      <HStack>
        <Text fontWeight="bold">{comment.author ?? 'Anonymous'}</Text>
        <Text color="gray.500" fontSize="sm">
          {timeAgo(comment.postedAt)}
        </Text>
      </HStack>
      <Text mt={1}>{comment.text}</Text>
      <Votes votes={comment.votes} commentId={comment.id} />
    </CommentWrapperWithImage>
  );
}

function Votes({ votes, commentId }: { votes: number; commentId: string }) {
  const toast = useToast();

  return (
    <HStack alignItems="center">
      <Text>{alwaysDisplaySignFormatter.format(votes)}</Text>
      <Button
        variant="ghost"
        paddingInlineStart={2}
        paddingInlineEnd={2}
        onClick={() => voteOnComment('up', commentId)}
      >
        <ArrowUpIcon />
      </Button>
      <Button
        variant="ghost"
        paddingInlineStart={2}
        paddingInlineEnd={2}
        onClick={() => voteOnComment('down', commentId)}
      >
        <ArrowDownIcon />
      </Button>
    </HStack>
  );

  function voteOnComment(vote: 'up' | 'down', commentId: string) {
    publicApi
      .post(`/comments/${commentId}/${vote}vote`)
      .then(undefined, (res) => {
        const title =
          res.response?.status === 400
            ? 'You already voted on this comment'
            : 'Error voting on comment';
        toast({
          title,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }
}
