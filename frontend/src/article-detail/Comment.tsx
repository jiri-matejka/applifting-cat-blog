import { Text, HStack, Button, useToast } from '@chakra-ui/react';
import { timeAgo } from '@/utils/timeUtils';
import { CommentWrapperWithImage } from './CommentWrapperWithImage';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { publicApi } from '@/api/axiosConfig';
import type { CommentForDisplayType } from './Comments';
import { getAvatarImage } from '@/hooks/useAvatarImage';

const alwaysDisplaySignFormatter = new Intl.NumberFormat(undefined, {
  signDisplay: 'always',
});

export function Comment({
  comment,
  articleId,
}: {
  comment: CommentForDisplayType;
  articleId: string;
}) {
  const avatarSrc = getAvatarImage(!!comment.author);

  return (
    <CommentWrapperWithImage imageSrc={avatarSrc}>
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
