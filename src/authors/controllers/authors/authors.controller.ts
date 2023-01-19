import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthorDto } from 'src/users/dtos/CreateAuthor.dto';
import { AuthorsService } from 'src/authors/services/authors/authors.service';
import { Get } from '@nestjs/common/decorators';

@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}

  @Post()
  createAuthors(@Body() createAuthotDto: CreateAuthorDto) {
    return this.authorService.createAuthors(createAuthotDto);
  }

  @Get()
  getAuthors() {
    return this.authorService.findAuthors();
  }
}
