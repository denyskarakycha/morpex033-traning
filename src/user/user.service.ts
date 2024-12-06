import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { User } from 'src/database/entity/user.entity';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(paginationDto: PaginationDto) {
    const skip = (paginationDto.pageNumber - 1) * paginationDto.pageSize;

    const order: Record<string, 'ASC' | 'DESC'> = {};

    if (paginationDto.sortBy) {
      const sortOrder = paginationDto.order === 'DESC' ? 'DESC' : 'ASC';
      order[paginationDto.sortBy] = sortOrder;
    }

    const [users, total] = await this.userRepository.findAndCount({
      skip: skip,
      take: paginationDto.pageSize,
      order,
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
