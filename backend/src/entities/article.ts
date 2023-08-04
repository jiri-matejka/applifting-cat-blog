import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Comment } from './comment';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  perex!: string;

  @Column()
  content!: string;

  @CreateDateColumn()
  postedAt!: Date;

  @UpdateDateColumn()
  lastUpdatedAt!: Date;

  @Column()
  @Index()
  authorUsername!: string;

  @ManyToOne(() => User)
  author!: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments!: Comment[];
}
