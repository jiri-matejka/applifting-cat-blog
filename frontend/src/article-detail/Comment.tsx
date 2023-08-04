import { Text, HStack, Button } from '@chakra-ui/react';
import { type Comment as CommentType } from '../types/article';
import { timeAgo } from '@/utils/timeUtils';
import { CommentWrapperWithImage } from './CommentWrapperWithImage';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

const alwaysDisplaySignFormatter = new Intl.NumberFormat(undefined, {
  signDisplay: 'always',
});

export function Comment({ comment }: { comment: CommentType }) {
  return (
    <CommentWrapperWithImage imageSrc="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9">
      <HStack>
        <Text fontWeight="bold">{comment.author ?? 'Anonymous'}</Text>
        <Text color="gray.500" fontSize="sm">
          {timeAgo(comment.postedAt)}
        </Text>
      </HStack>
      <Text mt={1}>{comment.text}</Text>
      <Votes votes={comment.votes} />
    </CommentWrapperWithImage>
  );
}

function Votes({ votes }: { votes: number }) {
  return (
    <HStack alignItems="center">
      <Text>{alwaysDisplaySignFormatter.format(votes)}</Text>
      <Button variant="ghost" paddingInlineStart={2} paddingInlineEnd={2}>
        <ArrowUpIcon />
      </Button>
      <Button variant="ghost" paddingInlineStart={2} paddingInlineEnd={2}>
        <ArrowDownIcon />
      </Button>
    </HStack>
  );
}
