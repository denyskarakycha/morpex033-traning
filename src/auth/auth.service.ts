import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SingUpUserDto } from 'src/user/dto/sing-up-user.dto';
import { User } from 'src/database/entity/user.entity';
import { SingInUserDto } from 'src/user/dto/sing-in-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singUp(singUpUserDto: SingUpUserDto): Promise<User> {
    try {
      const hash = await bcrypt.hash(singUpUserDto.password, 8);

      singUpUserDto.password = hash;

      return this.userService.addUser(singUpUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async singIn(singInUserDto: SingInUserDto) {
    try {
      const users: User[] = await this.userService.getUserByName(
        singInUserDto.name,
      );

      if (!users) throw new UnauthorizedException('Wrong name or password');

      for (const user of users) {
        if (
          user.name === singInUserDto.name &&
          (await bcrypt.compare(singInUserDto.password, user.password))
        ) {
          const payload = {
            sub: user.id,
            name: user.name,
            role: user.role,
            iat: Date.now(),
          };

          const accessToken = await this.jwtService.signAsync(payload);

          return {
            access_token: accessToken,
          };
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}