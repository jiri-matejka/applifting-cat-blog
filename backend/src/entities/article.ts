import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  votes!: number;

  @CreateDateColumn()
  postedAt!: Date;

  @UpdateDateColumn()
  lastUpdatedAt!: Date;
}
