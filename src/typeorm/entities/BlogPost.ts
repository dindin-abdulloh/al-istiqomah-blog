import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'blog_posts' })
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  excerpt: string;

  @Column({ length: 500 })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
