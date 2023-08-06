import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Comment } from '../entities/comment';

export type CommentForWs = Pick<
  Comment,
  'id' | 'text' | 'votes' | 'postedAt'
> & {
  author?: string;
};

export const commentCallbacks = {
  afterInsertCallback: (insertedComment: CommentForWs) => {},
  afterVotingCallback: ({
    commentId,
    votes,
  }: {
    commentId: string;
    votes: number;
  }) => {},
};

@EventSubscriber()
export class CommentSubscriber implements EntitySubscriberInterface<Comment> {
  listenTo() {
    return Comment;
  }

  afterInsert(event: InsertEvent<Comment>) {
    commentCallbacks.afterInsertCallback({
      id: event.entity.id,
      text: event.entity.text,
      votes: event.entity.votes,
      postedAt: event.entity.postedAt,
      author: event.entity.author?.name,
    });
  }

  // afterUpdate from the interface is not helping here, since it's not returning
  // new votes value (it returns just an expression)
}
