import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { User } from 'src/database/entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(paginationDto: PaginationDto) {
    console.log(paginationDto);

    const skip = (paginationDto.pageNumber - 1) * paginationDto.pageSize;
    const where: FindOptionsWhere<User> = {};

    if (paginationDto.sortBy) {
      where[paginationDto.sortBy] = true;
    }

    const [users, total] = await this.userRepository.findAndCount({
      where,
      skip: skip,
      take: paginationDto.pageSize,
    });

    return {
      total: total,
      page: paginationDto.pageNumber,
      lastPage: Math.ceil(total / paginationDto.pageSize),
      data: users,
    };
  }

  async getUserById(id: UUID) {
    let user;

    try {
      user = await this.userRepository.findOneBy({ id: id });
    } catch (error) {
      throw new Error(error);
    }

    if (!user) throw new NotFoundException();

    return user;
  }

  async addUser(createUserDto: CreateUserDto) {
    let user;

    try {
      user = await this.userRepository.save(createUserDto);
    } catch (error) {
      throw new Error(error);
    }

    return user;
  }

  async deleteUserById(id: UUID) {
    let user;

    try {
      user = await this.userRepository.findOneBy({ id: id });
      await this.userRepository.delete(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUserById(id: UUID, updateUserDto: CreateUserDto) {
    let user;

    try {
      user = await this.userRepository.findOneBy({ id: id });

      Object.assign(user, updateUserDto);

      await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
