import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/entities/Author';
import { CreateAuthorParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  createAuthors(createAuthorDetail: CreateAuthorParams) {
    const newAuthor = this.authorRepository.create({
      ...createAuthorDetail,
      createdAt: new Date(),
    });

    return this.authorRepository.save(newAuthor);
  }

  findAuthors() {
    return this.authorRepository.find();
  }
}
