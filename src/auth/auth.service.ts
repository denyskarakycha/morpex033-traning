import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SingUpUserDto } from 'src/user/dto/sing-up-user.dto';
import { User } from 'src/database/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async singUp(singUpUserDto: SingUpUserDto): Promise<User> {
    try {
      const hash = await bcrypt.hash(singUpUserDto.password, 8);

      singUpUserDto.password = hash;

      return this.userService.addUser(singUpUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async singIn() {}
}
