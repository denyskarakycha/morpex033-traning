import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpUserDto } from 'src/user/dto/sing-up-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sing-up')
  singUp(@Body() singUpUserDto: SingUpUserDto) {
    return this.authService.singUp(singUpUserDto);
  }

  @Post('/sing-in')
  singIn() {}
}
