import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SingUpUserDto } from './dto/sing-up-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDataResponseDto } from 'src/common/dto/pagination-data-response.dto';
import { UserDto } from './dto/user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

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

      return new PaginationDataResponseDto<UserDto>(
        total,
        paginationDto.pageNumber,
        Math.ceil(total / paginationDto.pageSize),
        users.map((i) => new ResponseUserDto(i)),
      );
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: { taughtSubjects: true, subjects: true },
      });

      if (!user) throw new NotFoundException('User not found');

      return new ResponseUserDto(user);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({
        email: email,
      });

      if (!user) throw new NotFoundException('User not found');

      return new ResponseUserDto(user);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async addUser(createUserDto: SingUpUserDto) {
    try {
      const user = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
      if (user) {
        throw new ConflictException();
      }

      const createdUser: User = await this.userRepository.save(createUserDto);

      return new ResponseUserDto(createdUser);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUserById(id: string) {
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

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });

      if (!user) throw new NotFoundException('User not found');

      return await this.userRepository.save(updateUserDto);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateUser(user: UserDto) {
    try {
      if (!user) throw new NotFoundException('User not found');

      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
