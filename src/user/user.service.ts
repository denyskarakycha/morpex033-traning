import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SingUpUserDto } from './dto/sing-up-user.dto';
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

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        email: email,
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addUser(createUserDto: SingUpUserDto): Promise<User> {
    try {
      if (!this.userRepository.findOneBy({ email: createUserDto.email })) {
        throw new ConflictException();
      }

      const user: User = await this.userRepository.save(createUserDto);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUserById(id: UUID) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      await this.userRepository.delete(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUserById(id: UUID, updateUserDto: SingUpUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });

      if (!user) throw new NotFoundException('User not found');

      await this.userRepository.update(user.id, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
