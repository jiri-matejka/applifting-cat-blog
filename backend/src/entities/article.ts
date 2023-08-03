import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user';

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
  authorUsername!: string;

  @ManyToOne(() => User)
  author!: User;
}
