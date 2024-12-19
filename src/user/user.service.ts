import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SingUpUserDto } from './dto/sing-up-user.dto';
import { PaginationDto } from '../common/pagination.dto';
import { User } from 'src/database/entity/user.entity';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(paginationDto?: PaginationDto) {
    try {
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
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getUserById(id: UUID): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id: id });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      this.logger.log(error);
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
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async addUser(createUserDto: SingUpUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
      if (user) {
        throw new ConflictException();
      }

      const createdUser: User = await this.userRepository.save(createUserDto);

      return createdUser;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUserById(id: UUID) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.delete(user.id);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateUserById(id: UUID, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });

      if (!user) throw new NotFoundException('User not found');

      await this.userRepository.update(user.id, updateUserDto);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
