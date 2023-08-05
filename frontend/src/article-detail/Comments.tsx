import { Box, Heading } from '@chakra-ui/react';
import { type Comment as CommentType } from '../types/article';
import { JoinDiscussion } from './JoinDiscussion';
import { Comment } from './Comment';
import { useEffect, useRef, useState } from 'react';

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
  const [actualComments, setActualComments] =
    useState<CommentForDisplayType[]>(comments);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:3000/ws');

    wsRef.current.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
    };

    wsRef.current.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);

      if (message && message.operation === 'INSERT') {
        console.log('INSERT DETECT', message);
        const newCommentWithDate = {
          ...message.data,
          postedAt: new Date(message.data.postedAt),
        };
        const newComments = [...actualComments, newCommentWithDate].sort(
          (a, b) => b.postedAt - a.postedAt, // newest first
        );
        setActualComments(newComments);
      }
      if (message && message.operation === 'VOTE') {
        console.log('VOTE DETECT', message);
        const updatedComments = actualComments.map((comment) => {
          if (comment.id === message.data.id) {
            return { ...comment, votes: message.data.votes };
          }
          return comment;
        });
        setActualComments(updatedComments);
      }

      console.log(message);
    };

    wsRef.current.onclose = () => {
      console.log('disconnected');
      // automatically try to reconnect on connection loss
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  return (
    <Box mt={4} width="full">
      <Heading as="h3" size="md" mb={2}>
        Comments {comments.length > 0 ? `(${comments.length})` : ''}
      </Heading>
      <JoinDiscussion articleId={articleId} />
      {actualComments.map((comment) => (
        <Comment key={comment.id} comment={comment} articleId={articleId} />
      ))}
    </Box>
  );
}
