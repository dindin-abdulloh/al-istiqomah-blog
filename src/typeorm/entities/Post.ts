import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Author } from './Author';
import { Category } from './Category';
import slugify from 'slugify';


@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  excerpt: string;

  @Column()
  slug: string

  @Column({ length: 500 })
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.title, { lower: true });
  }

  @ManyToOne(() => Category, (category) => category.posts)
  categories: Category;
}
