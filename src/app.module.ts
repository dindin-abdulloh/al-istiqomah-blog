import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { AuthorsController } from './authors/controllers/authors/authors.controller';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './typeorm/entities/Author';
import { PostModule } from './post/post.module';
import { BlogPost } from './typeorm/entities/BlogPost';
import { Post } from './typeorm/entities/Post';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './typeorm/entities/Category';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs-blog',
      entities: [User, Profile, BlogPost, Author, Post, Category],
      synchronize: true,
    }),
    AuthorsModule,
    PostModule,
    CategoriesModule,
  ],
  controllers: [AppController, AuthorsController],
  providers: [AppService],
})
export class AppModule {}
