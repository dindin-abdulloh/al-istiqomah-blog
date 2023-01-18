import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.userRepository.find();
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
}
