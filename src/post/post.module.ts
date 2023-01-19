import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/entities/Author';
import { Category } from 'src/typeorm/entities/Category';
import { Post } from 'src/typeorm/entities/Post';
import { PostController } from './controllers/post/post.controller';
import { PostService } from './services/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Post, Category])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
