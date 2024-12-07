import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { User } from 'src/database/entity/user.entity';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(paginationDto: PaginationDto) {
    const skip = (paginationDto.pageNumber - 1) * paginationDto.pageSize;

    const order: Record<string, 'ASC' | 'DESC'> = {};

    if (paginationDto.sortBy) {
      const sortOrder = paginationDto?.order || 'DESC';
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

  async getUserById(id: UUID): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id: id });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // fix this example above
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
      // check if user exist or not and throw error

      // use typeorm method .update(userId, updateUserDto)

      Object.assign(user, updateUserDto); // delete this

      await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
