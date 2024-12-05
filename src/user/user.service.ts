import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users = [{ id: '1', name: 'Andrey', age: 69 }];

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
