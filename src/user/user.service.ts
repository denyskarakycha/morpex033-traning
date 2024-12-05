import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users = [{ id: '1', name: 'Andrey', age: 69 }];

  getUserById(id: string) {
    for (const user of this.users) {
      if (user.id === id) {
        return user;
      } else {
        return 'User not found';
      }
    }
  }

  addUser(createUserDto: UserDto) {
    createUserDto.id = uuidv4();
    this.users.push(createUserDto);
  }

  deleteUserById(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    } else {
      return 'User not found';
    }
  }

  updateUserById(id: string, updateUserDto: UserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
    } else {
      return 'User not found';
    }
  }
}

function uuidv4(): string {
  throw new Error('Function not implemented.');
}
