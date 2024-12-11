import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SingUpUserDto } from './dto/sing-up-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.getAllUsers(paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Param('id') id: UUID) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: UUID) {
    return this.userService.deleteUserById(id);
  }

  @Put('/:id')
  updateUser(@Param('id') id: UUID, @Body() updateUserDto: SingUpUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }
}
