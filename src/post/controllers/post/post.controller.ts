import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from 'src/post/services/post/post.service';
import { CreatePostDto } from 'src/users/dtos/CreatePostDto.dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.fetchPostData();
  }

  @Post()
  createPosts(@Body() createPostDto: CreatePostDto) {
    return this.postService.storePost(createPostDto);
  }
}
