import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/typeorm/entities/Category';
import { Post } from 'src/typeorm/entities/Post';
import { Repository } from 'typeorm';
import { CreatePostParams } from 'src/utils/type';
import { Author } from 'src/typeorm/entities/Author';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  fetchPostData() {
    return this.postRepository.find({ relations: ['author', 'categories'] });
  }

  async storePost(createPostDetail: CreatePostParams) {
    const category = await this.categoriesRepository.findOneBy({
      id: createPostDetail.category_id,
    });

    const author = await this.authorRepository.findOneBy({
      id: createPostDetail.author_id,
    });

    if (!category && !author)
      throw new HttpException(
        'Category and Author not found, Cannot create post',
        HttpStatus.BAD_REQUEST,
      );

    const newPost = this.postRepository.create({
      ...createPostDetail,
      author,
      categories: category,
    });

    return this.postRepository.save(newPost);
  }
}
