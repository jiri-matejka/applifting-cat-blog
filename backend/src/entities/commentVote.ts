import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';

@Entity()
@Index(['commentId', 'ipAddress'], { unique: true })
export class CommentVote {
  // this is dummy column, not used
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  commentId!: string;

  @Column()
  ipAddress!: string;

  @Column()
  vote!: 1 | -1;
}
