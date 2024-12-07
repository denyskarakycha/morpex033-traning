import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UUID } from 'crypto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.getAllUsers(paginationDto);
  }

  @Get('/:id')
  getUser(@Param('id') id: UUID) {
    return this.userService.getUserById(id);
  }

  @Post()
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: UUID) {
    return this.userService.deleteUserById(id);
  }

  @Put('/:id')
  updateUser(@Param('id') id: UUID, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }
}
