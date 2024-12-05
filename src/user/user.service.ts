import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users = [{ id: '1', name: 'Andrey', age: 69 }];

  getUser(id: string) {
    for (const user of this.users) {
      if (user.id === id) {
        return user;
      } else {
        return 'User not found';
      }
    }
  }

  addUser(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
  }
}
