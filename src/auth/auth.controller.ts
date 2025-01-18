import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseUserDto } from '../user/dto/response-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AccessTokenDto } from './dto/access_token.dto';
import { AccessRefreshTokenDto } from './dto/access-refresh-token.dto';
import { SingUpUserDto } from '../user/dto/sing-up-user.dto';
import { SingInUserDto } from '../user/dto/sing-in-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ type: ResponseUserDto })
  @Post('/sing-up')
  singUp(@Body() singUpUserDto: SingUpUserDto) {
    return this.authService.singUp(singUpUserDto);
  }

  @ApiResponse({ type: AccessRefreshTokenDto })
  @Post('/sing-in')
  singIn(@Body() singInUserDto: SingInUserDto) {
    return this.authService.singIn(singInUserDto);
  }

  @ApiResponse({ type: AccessTokenDto })
  @Post('refresh')
  refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }
}
