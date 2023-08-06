import { Box, Heading } from '@chakra-ui/react';
import { type Comment as CommentType } from '../types/article';
import { JoinDiscussion } from './JoinDiscussion';
import { Comment } from './Comment';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { WEBSOCKET_ENDPOINT } from '@/api/constants';

export type CommentForDisplayType = Pick<
  CommentType,
  'id' | 'text' | 'author' | 'votes' | 'postedAt'
>;

export function Comments({
  comments,
  articleId,
}: {
  comments: CommentForDisplayType[];
  articleId: string;
}) {
  const [currentComments, setCurrentComments] =
    useState<CommentForDisplayType[]>(comments);

  useRealtimeComments(setCurrentComments);

  return (
    <Box mt={4} width="full">
      <Heading as="h3" size="md" mb={2}>
        Comments{' '}
        {currentComments.length > 0 ? `(${currentComments.length})` : ''}
      </Heading>
      <JoinDiscussion articleId={articleId} />
      {currentComments.map((comment) => (
        <Comment key={comment.id} comment={comment} articleId={articleId} />
      ))}
    </Box>
  );
}

function useRealtimeComments(
  setRealtimeComments: Dispatch<SetStateAction<CommentForDisplayType[]>>,
) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(WEBSOCKET_ENDPOINT);

    wsRef.current.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      if (message && message.operation === 'INSERT') {
        const newCommentWithParsedDate = {
          ...message.data,
          postedAt: new Date(message.data.postedAt),
        };
        const getNewComments = (oldComments: CommentForDisplayType[]) => [
          newCommentWithParsedDate, // it's the newest comment, no need to sort them
          ...oldComments,
        ];

        setRealtimeComments(getNewComments);
      } else if (message && message.operation === 'VOTE') {
        const getNewComments = (oldComments: CommentForDisplayType[]) =>
          oldComments.map((comment) => {
            if (comment.id === message.data.commentId) {
              return { ...comment, votes: message.data.votes };
            }
            return comment;
          });

        setRealtimeComments(getNewComments);
      }
    };

    // TODO: automatically try to reconnect on connection loss

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);
}
