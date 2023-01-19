import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from 'src/typeorm/entities/BlogPost';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateBlogPostParams,
  CreateUserParams,
  CreateUserProfilParams,
  UpdateUserParams,
} from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(BlogPost) private postRepository: Repository<BlogPost>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }
  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  createUsers(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetail: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetail });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  //   Create Profile
  async createUserProfile(
    id: number,
    createUserProfileDetail: CreateUserProfilParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException(
        'User not found, Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetail);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  // Create post
  async createUserPost(id: number, createUserPostDetail: CreateBlogPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found, Cannot create post',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPostDetail,
      user,
    });

    console.log(newPost);

    return this.postRepository.save(newPost);
  }
}
