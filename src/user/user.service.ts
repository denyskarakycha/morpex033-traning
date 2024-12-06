import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './enum/user-role.enum';
import { UserDto } from './dto/user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { SortPaginationEnum } from 'src/common/enum/sort-pagination.enum';

@Injectable()
export class UserService {
  private users: UserDto[] = [
    { id: '1', name: 'User1', age: 23, role: UserRole.Student },
    { id: '2', name: 'User2', age: 34, role: UserRole.Teacher },
    { id: '3', name: 'User3', age: 28, role: UserRole.Student },
    { id: '4', name: 'User4', age: 41, role: UserRole.Teacher },
    { id: '5', name: 'User5', age: 30, role: UserRole.Student },
    { id: '6', name: 'User6', age: 22, role: UserRole.Student },
    { id: '7', name: 'User7', age: 50, role: UserRole.Teacher },
    { id: '8', name: 'User8', age: 37, role: UserRole.Student },
    { id: '9', name: 'User9', age: 19, role: UserRole.Teacher },
    { id: '10', name: 'User10', age: 24, role: UserRole.Student },
    { id: '11', name: 'User11', age: 44, role: UserRole.Teacher },
    { id: '12', name: 'User12', age: 32, role: UserRole.Student },
    { id: '13', name: 'User13', age: 39, role: UserRole.Teacher },
    { id: '14', name: 'User14', age: 21, role: UserRole.Student },
    { id: '15', name: 'User15', age: 29, role: UserRole.Student },
    { id: '16', name: 'User16', age: 26, role: UserRole.Teacher },
    { id: '17', name: 'User17', age: 48, role: UserRole.Student },
    { id: '18', name: 'User18', age: 35, role: UserRole.Teacher },
    { id: '19', name: 'User19', age: 27, role: UserRole.Student },
    { id: '20', name: 'User20', age: 42, role: UserRole.Teacher },
  ];

  getAllUsers(paginationDto: PaginationDto) {
    const sortedUsers = [...this.users].sort((a, b) => {
      const aValue = a[paginationDto.sortBy];
      const bValue = b[paginationDto.sortBy];

      if (paginationDto.order === SortPaginationEnum.ACS) {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    const startIndex = (paginationDto.pageNumber - 1) * paginationDto.pageSize;
    const paginatedUsers = sortedUsers.slice(
      startIndex,
      startIndex + paginationDto.pageSize,
    );

    return {
      total: this.users.length,
      pageNumber: paginationDto.pageNumber,
      pageSize: paginationDto.pageSize,
      data: paginatedUsers,
    };
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    return user;
  }

  addUser(createUserDto: CreateUserDto) {
    createUserDto.id = uuidv4();

    this.users.push(createUserDto);
    return createUserDto;
  }

  deleteUserById(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    } else {
      throw new NotFoundException();
    }
  }

  updateUserById(id: string, updateUserDto: CreateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
    } else {
      throw new NotFoundException();
    }
  }
}
