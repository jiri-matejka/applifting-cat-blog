import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
  AfterUpdate,
  AfterInsert,
} from 'typeorm';
import { User } from './user';
import { Article } from './article';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  text!: string;

  @ManyToOne(() => Article)
  @Index()
  article!: Article;

  @Column({ default: 0 })
  votes!: number;

  @ManyToOne(() => User)
  author!: User | undefined;

  @CreateDateColumn()
  postedAt!: Date;

  @AfterUpdate()
  onCommentUpdate() {}

  @AfterInsert()
  onCommentInsert() {}
}
