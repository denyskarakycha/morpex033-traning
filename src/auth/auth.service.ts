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
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singUp(singUpUserDto: SingUpUserDto): Promise<User> {
    try {
      const hash = await bcrypt.hash(singUpUserDto.password, 8);

      return this.userService.addUser({ ...singUpUserDto, password: hash });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async singIn(singInUserDto: SingInUserDto) {
    try {
      const user = await this.userService.getUserByEmail(singInUserDto.email);

      if (!user) throw new UnauthorizedException('Wrong email or password');

      if (await bcrypt.compare(singInUserDto.password, user.password)) {
        const payload = { id: user.id, email: user.email, role: user.role };

        const accessToken = await this.jwtService.signAsync(payload);

        const refreshToken = await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.REFRESH_EXPIRES_IN,
        });

        return {
          accessToken,
          refreshToken,
        };
      } else {
        throw new UnauthorizedException('Wrong email or password');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async decodeAccessToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = this.jwtService.decode(refreshToken);

    return this.jwtService.signAsync(payload);
  }
}
