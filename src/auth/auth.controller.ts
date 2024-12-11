import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpUserDto } from 'src/user/dto/sing-up-user.dto';
import { SingInUserDto } from 'src/user/dto/sing-in-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sing-up')
  singUp(@Body() singUpUserDto: SingUpUserDto) {
    return this.authService.singUp(singUpUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sing-in')
  singIn(@Body() singInUserDto: SingInUserDto) {
    return this.authService.singIn(singInUserDto);
  }
}
